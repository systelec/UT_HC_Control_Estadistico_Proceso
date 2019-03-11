'use strict';

const Producto = use('App/Models/Producto');

class ProductoController {
  async index({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'codigo';
    descending = descending || 'ASC';
    perPage = perPage || 10;
    searchField = searchField || 'codigo';
    search = search || '';

    const productos = await Producto.query()
      .orderBy(sortBy, descending)
      .where(searchField, 'like', `%${search}%`)
      .paginate(page, perPage);

    response.status(200).json(productos);
  }

  async store({ request, response }) {
    const data = request.only(['codigo', 'descripcion']);
    const producto = await Producto.create(data);

    response.status(201).json(producto);
  }

  async show({ request, response, params: { id } }) {
    const producto = await Producto.findOrFail(id);

    if (!producto) {
      response.status(404).json({
        message: 'Producto no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(producto);
  }

  async update({ request, response, params: { id } }) {
    const data = request.only(['codigo', 'descripcion']);
    const producto = await Producto.find(id);

    if (!producto) {
      response.status(404).json({
        message: 'Producto no encontrada.',
        id
      });
      return;
    }
    producto.codigo = data.codigo || producto.codigo;
    producto.descripcion = data.descripcion || producto.descripcion;
    await producto.save();

    response.status(200).json(producto);
  }

  async destroy({ request, response, params: { id } }) {
    const producto = await Producto.find(id);

    if (!producto) {
      response.status(404).json({
        message: 'Producto no encontrada.',
        id
      });
      return;
    }
    await producto.delete();

    response.status(200).json(producto);
  }
}

module.exports = ProductoController;
