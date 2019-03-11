'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductoSchema extends Schema {
  up() {
    this.create('productos', table => {
      table.increments();
      table.string('codigo');
      table.string('descripcion');
    });
  }

  down() {
    this.drop('productos');
  }
}

module.exports = ProductoSchema;
