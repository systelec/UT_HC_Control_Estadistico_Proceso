'use strict';

const MixerProducto = use('App/Models/MixerProducto');

class MixerProductoController {
  async index({ request, response }) {
    const mixerProducto = await MixerProducto.all();

    response.status(200).json(mixerProducto);
  }

  async store({ request, response }) {
    const data = request.only(['mixer_id', 'producto_id']);
    const mixerProducto = await MixerProducto.create(data);

    response.status(201).json(mixerProducto);
  }

  async show({ request, response, params: { id } }) {
    const mixerProducto = await MixerProducto.findOrFail(id);

    if (!mixerProducto) {
      response.status(404).json({
        message: 'Mixer Producto no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(mixerProducto);
  }

  async update({ request, response, params: { id } }) {
    const data = request.only(['mixer_id', 'producto_id']);
    const mixerProducto = await MixerProducto.find(id);

    if (!mixerProducto) {
      response.status(404).json({
        message: 'Mixer Producto no encontrada.',
        id
      });
      return;
    }
    mixerProducto.mixer_id = data.mixer_id || mixerProducto.mixer_id;
    mixerProducto.producto_id = data.producto_id || mixerProducto.producto_id;
    await mixerProducto.save();

    response.status(200).json(mixerProducto);
  }

  async destroy({ request, response, params: { id } }) {
    const mixerProducto = await MixerProducto.find(id);

    if (!mixerProducto) {
      response.status(404).json({
        message: 'Mixer Producto no encontrada.',
        id
      });
      return;
    }
    await mixerProducto.delete();

    response.status(200).json(mixerProducto);
  }
}

module.exports = MixerProductoController;
