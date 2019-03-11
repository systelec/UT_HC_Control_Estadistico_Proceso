'use strict';

const Tag = use('App/Models/Tag');

class TagController {
  async index({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'tag_name';
    descending = descending || 'ASC';
    perPage = perPage || 10;
    searchField = searchField || 'tag_name';
    search = search || '';

    const tags = await Tag.query()
      .orderBy(sortBy, descending)
      .where(searchField, 'like', `%${search}%`)
      .paginate(page, perPage);

    response.status(200).json(tags);
  }

  async store({ request, response }) {
    const data = request.only(['nombre', 'descripcion']);
    const tag = await Tag.create(data);

    response.status(201).json(tag);
  }

  async show({ request, response, params: { id } }) {
    const tag = await Tag.findOrFail(id);

    if (!tag) {
      response.status(404).json({
        message: 'Tag no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(tag);
  }

  async update({ request, response, params: { id } }) {
    const data = request.only(['nombre', 'descripcion']);
    const tag = await Tag.find(id);

    if (!tag) {
      response.status(404).json({
        message: 'Tag no encontrada.',
        id
      });
      return;
    }
    tag.nombre = data.nombre || tag.nombre;
    tag.descripcion = data.descripcion || tag.descripcion;
    await tag.save();

    response.status(200).json(tag);
  }

  async destroy({ request, response, params: { id } }) {
    const tag = await Tag.find(id);

    if (!tag) {
      response.status(404).json({
        message: 'Tag no encontrada.',
        id
      });
      return;
    }
    await tag.delete();

    response.status(200).json(tag);
  }
}

module.exports = TagController;
