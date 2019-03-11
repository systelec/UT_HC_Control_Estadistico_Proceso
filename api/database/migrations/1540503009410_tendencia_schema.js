'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TendenciaSchema extends Schema {
  up() {
    this.create('tendencias', table => {
      table.integer('id').primary();
      table.string('nombre');
      table.string('tipo');
      table.string('descripcion');
      table.string('tag');
      table.integer('tag_codigo_producto');
      table.datetime('ultima_actualizacion').defaultTo(this.fn.now());
      table.boolean('tv').defaultTo(false);
      table.boolean('tiempo_real').defaultTo(false);
      table.integer('mixer_id').unsigned();
      table
        .foreign('mixer_id')
        .references('mixers.id')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('tendencias');
  }
}

module.exports = TendenciaSchema;
