'use strict';

const Destinatario = use('App/Models/Destinatario');

class DestinatarioController {
  async index({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'email';
    descending = descending || 'ASC';
    perPage = perPage || 10;
    searchField = searchField || 'email';
    search = search || '';

    const destinatarios = await Destinatario.query()
      .orderBy(sortBy, descending)
      .where(searchField, 'like', `%${search}%`)
      .paginate(page, perPage);

    response.status(200).json(destinatarios);
  }

  async store({ request, response }) {
    const data = request.only(['email', 'nombre', 'apellido', 'envio']);
    const destinatario = await Destinatario.create(data);

    response.status(201).json(destinatario);
  }

  async show({ request, response, params: { id } }) {
    const destinatario = await Destinatario.findOrFail(id);

    if (!destinatario) {
      response.status(404).json({
        message: 'Destinatario no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(destinatario);
  }

  async update({ request, response, params: { id } }) {
    const data = request.only(['email', 'nombre', 'apellido', 'envio']);
    const destinatario = await Destinatario.find(id);

    if (!destinatario) {
      response.status(404).json({
        message: 'Destinatario no encontrada.',
        id
      });
      return;
    }
    destinatario.email = data.email || destinatario.email;
    destinatario.nombre = data.nombre || destinatario.nombre;
    destinatario.apellido = data.apellido || destinatario.apellido;
    destinatario.envio = data.envio ? true : false;
    await destinatario.save();

    response.status(200).json(destinatario);
  }

  async destroy({ request, response, params: { id } }) {
    const destinatario = await Destinatario.find(id);

    if (!destinatario) {
      response.status(404).json({
        message: 'Destinatario no encontrada.',
        id
      });
      return;
    }
    await destinatario.delete();

    response.status(200).json(destinatario);
  }
}

module.exports = DestinatarioController;
