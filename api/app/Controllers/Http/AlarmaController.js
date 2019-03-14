'use strict';

const Alarma = use('App/Models/Alarma');
const Ws = use('Ws');
const Redis = use('Redis');

class AlarmaController {
  async index({ request, response }) {
    let { page, sortBy, descending, perPage, search, searchField } = request.get();
    page = page || 1;
    sortBy = sortBy || 'created_at';
    descending = descending || 'DESC';
    perPage = perPage || 10;
    searchField = searchField || 'descripcion';
    search = search || '';

    const alarmas = await Alarma.query()
      .with('tendencia')
      .orderBy(sortBy, descending)
      .where(searchField, 'like', `%${search}%`)
      .paginate(page, perPage);

    response.status(200).json(alarmas);
  }

  async reconocer({ request, response, params: { id } }) {
    const data = request.only(['detalle']);
    const alarma = await Alarma.find(id);

    if (!alarma) {
      response.status(404).json({
        message: 'Alarma no encontrada.',
        id
      });
      return;
    }
    alarma.reconocida = true;
    alarma.detalle = data.detalle || alarma.detalle;

    const cantidadAlarmSinReconocer = await Redis.get('cantidad_alarmas_sin_reconocer');
    await Redis.set('cantidad_alarmas_sin_reconocer', cantidadAlarmSinReconocer - 1);

    try {
      Ws.getChannel('socket')
        .topic('socket')
        .broadcastToAll('cantidad_alarmas_sin_reconocer', cantidadAlarmSinReconocer - 1);
    } catch (error) {
      console.log('No hay usuarios subcriptos al socket');
    }

    await alarma.save();

    response.status(200).json(alarma);
  }
}

module.exports = AlarmaController;
