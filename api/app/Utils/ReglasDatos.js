'use strict';

const Alarma = use('App/Models/Alarma');

var ReglasDatos = {
  async sobrepasaLimite(historico, limite) {
    let alarma = {
      codigo_producto: historico.codigo_producto,
      tendencia_id: historico.tendencia_id,
      tipo: 1
    };

    // Analizo limites superiores
    // Crear alarma en caso que supere el limite de especificacion
    if (historico.pv > limite.usl) {
      alarma.descripcion = 'Limite de especificacion superado';
      alarma.prioridad = 40;
      return await Alarma.create(alarma);
    }

    // Crear alarma en caso que supere el 3° limite SIGMA
    if (historico.pv > limite.lh_3sigma) {
      alarma.descripcion = '3° Limite sigma fue superado';
      alarma.prioridad = 30;
      return await Alarma.create(alarma);
    }

    // Crear alarma en caso que supere el 2° limite SIGMA
    if (historico.pv > limite.lh_2sigma) {
      alarma.descripcion = '2° Limite sigma fue superado';
      alarma.prioridad = 20;
      return await Alarma.create(alarma);
    }

    // Crear alarma en caso que supere el 1° limite SIGMA
    if (historico.pv > limite.lh_1sigma) {
      alarma.descripcion = '1° Limite sigma fue superado';
      alarma.prioridad = 10;
      return await Alarma.create(alarma);
    }

    // Analizo limites inferiores
    // Crear alarma en caso que supere el limite de especificacion
    if (historico.pv < limite.lsl) {
      alarma.descripcion = 'Limite de especificacion superado';
      alarma.prioridad = 40;
      return await Alarma.create(alarma);
    }

    // Crear alarma en caso que supere el 3° limite SIGMA
    if (historico.pv < limite.ll_3sigma) {
      alarma.descripcion = '3° Limite sigma fue superado';
      alarma.prioridad = 30;
      return await Alarma.create(alarma);
    }

    // Crear alarma en caso que supere el 2° limite SIGMA
    if (historico.pv < limite.ll_2sigma) {
      alarma.descripcion = '2° Limite sigma fue superado';
      alarma.prioridad = 20;
      return await Alarma.create(alarma);
    }

    // Crear alarma en caso que supere el 1° limite SIGMA
    if (historico.pv < limite.ll_1sigma) {
      alarma.descripcion = '1° Limite sigma fue superado';
      alarma.prioridad = 10;
      return await Alarma.create(alarma);
    }
  }
};

module.exports = ReglasDatos;
