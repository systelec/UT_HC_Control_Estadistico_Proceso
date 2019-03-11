'use strict';

const Tendencia = use('App/Models/Tendencia');
const Limite = use('App/Models/Limite');
const WinCC = require('../Services/WinCC');
const FormateaDatos = require('../Utils/FormateaDatos');
const FechaAdquisicion = require('../Utils/FechaAdquisicion');
const ReglasDatos = require('../Utils/ReglasDatos');
const Redis = use('Redis');
const _ = require('lodash');
const moment = require('moment');
const Database = use('Database');

module.exports = {
  async rapida() {
    try {
      console.time('Adquiriendo datos de WINCC');
      const winCC = new WinCC();
      let tendencias = await Tendencia.query()
        .with('tag_producto')
        .with('tags')
        .with('limites', bluilder => {
          bluilder.where('ultimo', true);
        })
        .where('tipo', 'STAX')
        .fetch();

      tendencias = tendencias.toJSON();
      const tendenciasAgrupadas = _.groupBy(tendencias, 'tag_codigo_producto');

      // Traigo fecha actual y la ultima en que se ejecuto la actualizacion
      await Redis.set('spc_desde', JSON.stringify('2019-03-01 00:00:00'));
      const fechas = await FechaAdquisicion.arrayDesdeHasta();
      const desde = fechas[0];
      const hasta = fechas[1];

      // const desde = '2019-02-20 00:00:00';
      // const hasta = '2019-02-24 17:00:00';
      const arrayIteraciones = await FechaAdquisicion.arrayIteraciones(desde, hasta);

      for (let fecha of arrayIteraciones) {
        console.time('Adquisicio datos');
        console.log(fecha.desde, fecha.hasta);

        let historicosFiltradoTotal = [];
        let codigosProductosActuales = [];
        for (const key in tendenciasAgrupadas) {
          // Agrupo tag y extraigo varibles
          if (parseInt(key) >= 0) {
            const tags = tendenciasAgrupadas[key]
              .map(tendencia => {
                return tendencia.tags;
              })
              .reduce((prev, curr) => prev.concat(curr));

            const variables = tags.map(tag => tag.archive_id).join(';');
            // Consulto historicos de las variables de los tag agrupados
            const historicos = await winCC.getHistoricos(variables, fecha.desde, fecha.hasta);
            // Agrupo historicos y divido por los que se encuentran filtrados en sistemas y los que no
            const historicosAgrupados = _.groupBy(historicos, 'Filtrado');
            let historicosFiltrado = historicosAgrupados[true] || [];
            let historicosSinFiltrar = historicosAgrupados[false] || [];
            // Si existen historicos sin filtrar, filtro con respecto a historicos tipo = 5
            if (historicosSinFiltrar.length > 0) {
              const filtroDeHistoricos = historicosFiltrado.filter(
                historico => historico.Tipo === 5
              );
              filtroDeHistoricos.forEach(historico => {
                const historicoFiltrado = historicosSinFiltrar.find(item => {
                  if (item.Timestamp === historico.Timestamp) {
                    return true;
                  }
                });
                if (historicoFiltrado) {
                  historicosFiltrado.push(historicoFiltrado);
                }
              });
            }
            // Una vez usado los historicos Tipo = 5 para filtrar los quitos
            historicosFiltrado = historicosFiltrado.filter(historico => historico.Tipo != 5);
            // Agrega a los historicos filtrados el codigo de producto
            const historicosCodigoProducto = await winCC.getHistoricos(
              key,
              fecha.desde,
              fecha.hasta
            );
            if (historicosCodigoProducto.length > 0) {
              codigosProductosActuales.push({
                archive_id: key,
                codigo_producto:
                  historicosCodigoProducto[historicosCodigoProducto.length - 1].RealValue
              });
            }

            historicosFiltrado.forEach(historico => {
              if (historico.Tipo === 1) {
                let producto = historicosCodigoProducto.find(item => {
                  if (item.Timestamp === historico.Timestamp) {
                    return true;
                  }
                });
                if (producto) {
                  historicosFiltrado.push({
                    Timestamp: historico.Timestamp,
                    Archive_ID: historico.Archive_ID,
                    RealValue: producto.RealValue,
                    Bloque_ID: historico.Bloque_ID,
                    Tipo: 6,
                    Filtrado: true
                  });
                }
              }
            });

            historicosFiltradoTotal = historicosFiltradoTotal.concat(historicosFiltrado);
          }
        }
        // Formatea datos
        const historicosFormateado = FormateaDatos.historicos(historicosFiltradoTotal);

        // Verfico si los historicos cumplen con las reglas (TRATAR DE MEJOR A FUTURO - COMPLEJIDA N SEGUN LA CANTIDAD DE HISTORICOS)
        let i = 0;
        for (const historico of historicosFormateado) {
          const limite = await Limite.query()
            .where('created_at', '<', historico.fecha)
            .where('tendencia_id', historico.tendencia_id)
            .where(builder => {
              builder
                .where('codigo_producto', historico.codigo_producto)
                .orWhere('codigo_producto', null);
            })
            .orderBy('created_at', 'DESC')
            .first();

          if (limite) {
            // Verifico regla para ver si pasa los limites
            const alarma = await ReglasDatos.sobrepasaLimite(historico, limite);

            // Si existe alarma indico que el historico disparo una alarma y envio un email notificando
            if (alarma) {
              historicosFormateado[i].disparo_alarma = true;
            }
          }

          i = i + 1;
        }

        // Guardo historicos en DB
        await Database.from('historicos').insert(historicosFormateado);
        await Redis.set('spc_desde', JSON.stringify(fecha.hasta));

        // Formateo datos para emitir por socket
        const datos = await FormateaDatos.sockets(
          codigosProductosActuales,
          historicosFormateado,
          tendencias,
          fecha.desde,
          fecha.hasta
        );

        // Guardo en memoria y publico socket
        Redis.publish('datos_socket', JSON.stringify(datos));
        console.timeEnd('Adquisicio datos');
      }

      console.timeEnd('Adquiriendo datos de WINCC');

      return Promise.resolve(hasta);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
