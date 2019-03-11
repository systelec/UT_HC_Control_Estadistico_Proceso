'use strict';

const _ = require('lodash');
const moment = require('moment');
const Limite = use('App/Models/Limite');

var FormateaDatos = {
  historicos(datos) {
    let historicos = [];
    let pv, sp, tk, codigo_producto;
    const datosAgrupadosPorBloqueId = _.groupBy(datos, 'Bloque_ID');

    for (const keyA in datosAgrupadosPorBloqueId) {
      const datosAgrupadosPorFecha = _.groupBy(datosAgrupadosPorBloqueId[keyA], 'Timestamp');

      for (const keyB in datosAgrupadosPorFecha) {
        pv = datosAgrupadosPorFecha[keyB].find(item => {
          if (parseInt(item.Tipo) === 1) {
            return true;
          }
          return false;
        });

        sp = datosAgrupadosPorFecha[keyB].find(item => {
          if (parseInt(item.Tipo) === 2) {
            return true;
          }
          return false;
        });

        tk = datosAgrupadosPorFecha[keyB].find(item => {
          if (parseInt(item.Tipo) === 3) {
            return true;
          }
          return false;
        });

        codigo_producto = datosAgrupadosPorFecha[keyB].find(item => {
          if (parseInt(item.Tipo) === 6) {
            return true;
          }
          return false;
        });

        let fecha = new Date(keyB);
        fecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
        historicos.push({
          fecha: fecha,
          pv: pv ? pv.RealValue : null,
          sp: sp ? sp.RealValue : null,
          tk: tk ? tk.RealValue : null,
          codigo_producto: codigo_producto ? codigo_producto.RealValue : null,
          tendencia_id: keyA
        });
      }
    }
    return historicos;
  },
  async sockets(productos, historicos, tendencias, desde, hasta) {
    let datos = [];

    for (const tendencia of tendencias) {
      let item = {
        desde,
        hasta,
        tendencia: {
          id: tendencia.id,
          nombre: tendencia.nombre,
          tag: tendencia.tag
        },
        limites: tendencia.limites
      };

      // Filtro historicos
      const historico = historicos.filter(historico => {
        if (parseInt(historico.tendencia_id) === parseInt(tendencia.id)) {
          return true;
        }
      });
      item.historicos = historico;

      // Cuento cantidad de historicos que dispararon alarmas
      const cantidadAlarmasDisparadas = historicos.filter(historico => {
        if (historico.disparo_alarma) {
          return true;
        }
      });
      item.cantidad_alarmas = cantidadAlarmasDisparadas.length;

      // Busco producto
      const producto = productos.find(producto => {
        if (parseInt(tendencia.tag_codigo_producto) === parseInt(producto.archive_id)) {
          return true;
        }
      });
      item.producto = producto ? producto.codigo_producto : null;

      datos.push(item);
    }

    // Ordenos datos segun la cantidad de alarmas que generaron
    datos = datos.sort((a, b) => {
      if (a.cantidad_alarmas > b.cantidad_alarmas) {
        return 1;
      }

      if (a.cantidad_alarmas < b.cantidad_alarmas) {
        return -1;
      }

      return 0;
    });

    return datos;
  }
};

module.exports = FormateaDatos;
