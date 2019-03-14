'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Alarma extends Model {
  tendencia() {
    return this.belongsTo('App/Models/Tendencia');
  }
}

module.exports = Alarma;
