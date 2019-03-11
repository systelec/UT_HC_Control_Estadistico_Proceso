'use strict';

const moment = require('moment');
const Redis = use('Redis');

var FechaAdquisicion = {
  async arrayDesdeHasta() {
    let hasta = moment();
    let desde = await Redis.get('spc_desde');

    if (!desde) {
      desde = hasta.add(4, 'hours').format('YYYY-MM-DD HH:mm:ss');
    } else {
      desde = JSON.parse(desde);
    }

    hasta = hasta.format('YYYY-MM-DD HH:mm:ss');
    return [desde, hasta];
  },

  async arrayIteraciones(desde, hasta) {
    // Saco 3 minutos para compensar hora con la del servidor
    desde = moment(desde);
    hasta = moment(hasta);

    let i = 0;
    let arrayIteraciones = [];
    const iteraciones = hasta.diff(desde, 'hours');

    if (iteraciones === 0) {
      arrayIteraciones.push({
        desde: desde.format('YYYY-MM-DD HH:mm:ss'),
        hasta: hasta.format('YYYY-MM-DD HH:mm:ss')
      });
    } else {
      let fechaInicial = moment(desde);

      for (i; i < iteraciones + 1; i++) {
        arrayIteraciones.push({
          desde: fechaInicial.format('YYYY-MM-DD HH:mm:ss'),
          hasta: fechaInicial.add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
        });
      }
      arrayIteraciones[arrayIteraciones.length - 1].hasta = hasta.format('YYYY-MM-DD HH:mm:ss');

      arrayIteraciones = arrayIteraciones.filter(item => {
        if (item.desde !== item.hasta) {
          return true;
        }
      });
    }

    return arrayIteraciones;
  }
};

module.exports = FechaAdquisicion;
