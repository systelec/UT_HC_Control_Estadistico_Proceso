'use strict';

const Tendencia = use('App/Models/Tendencia');

class TendenciaController {
  async index({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'nombre';
    descending = descending || 'ASC';
    perPage = perPage || 30;
    searchField = searchField || 'nombre';
    search = search || '';

    const tendencias = await Tendencia.query()
      .with('tag_producto')
      .with('mixer')
      .with('tags')
      .with('limites', bluilder => {
        bluilder.where('ultimo', true);
      })
      .orderBy(sortBy, descending)
      .where('tipo', 'STAX')
      .where(searchField, 'like', `%${search}%`)
      .paginate(page, perPage);

    response.status(200).json(tendencias);
  }

  async store({ request, response }) {
    const data = request.only([
      'nombre',
      'tipo',
      'descripcion',
      'tag',
      'tag_codigo_producto',
      'mixer_id'
    ]);
    const tendencia = await Tendencia.create(data);

    response.status(201).json(tendencia);
  }

  async show({ request, response, params: { id } }) {
    const tendencia = await Tendencia.findOrFail(id);

    if (!tendencia) {
      response.status(404).json({
        message: 'Tendencia no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(tendencia);
  }

  async update({ request, response, params: { id } }) {
    const data = request.only([
      'nombre',
      'tipo',
      'descripcion',
      'tag',
      'tag_codigo_producto',
      'ultima_actualizacion',
      'tv',
      'tiempo_real',
      'mixer_id'
    ]);
    const tendencia = await Tendencia.find(id);

    if (!tendencia) {
      response.status(404).json({
        message: 'Tendencia no encontrada.',
        id
      });
      return;
    }
    tendencia.nombre = data.nombre || tendencia.nombre;
    tendencia.tipo = data.tipo || tendencia.tipo;
    tendencia.descripcion = data.descripcion || tendencia.descripcion;
    tendencia.tag = data.tag || tendencia.tag;
    tendencia.tag_codigo_producto = data.tag_codigo_producto || tendencia.tag_codigo_producto;
    tendencia.ultima_actualizacion = data.ultima_actualizacion || tendencia.ultima_actualizacion;
    tendencia.tv = data.tv ? true : false;
    tendencia.tiempo_real = data.tiempo_real ? true : false;
    tendencia.mixer_id = data.mixer_id || tendencia.mixer_id;
    await tendencia.save();

    response.status(200).json(tendencia);
  }

  async destroy({ request, response, params: { id } }) {
    const tendencia = await Tendencia.find(id);

    if (!tendencia) {
      response.status(404).json({
        message: 'Tendencia no encontrada.',
        id
      });
      return;
    }
    await tendencia.delete();

    response.status(200).json(tendencia);
  }

  async indexHistoricos({ request, response, params: { id } }) {
    const tendencia = await Tendencia.find(id);
    const historicos = await tendencia.historicos().fetch();

    response.status(200).json(historicos);
  }
}

module.exports = TendenciaController;
