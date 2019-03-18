'use strict';

const Limite = use('App/Models/Limite');
const Historico = use('App/Models/Historico');
const Database = use('Database');
const moment = require('moment');
const mathjs = require('mathjs')

class LimiteController {
  async index({ request, response }) {
    let { tendencia, productos, desde, hasta } = request.get();
    tendencia = tendencia || 6;
    productos = productos || [];
    hasta = hasta || moment().format('YYYY-MM-DD HH:mm:ss');
    desde =
      desde ||
      moment(hasta)
        .add(-100, 'days')
        .format('YYYY-MM-DD HH:mm:ss');

    let limites = [];
    if (productos.length === 0) {
      limites = await Limite.query()
        .where('tendencia_id', tendencia)
        .whereBetween('created_at', [desde, hasta])
        .orderBy('created_at', 'ASC')
        .fetch();
    } else {
      limites = await Limite.query()
        .whereIn('codigo_producto', productos)
        .where('tendencia_id', tendencia)
        .whereBetween('created_at', [desde, hasta])
        .orderBy('created_at', 'ASC')
        .fetch();
    }

    response.status(200).json(limites);
  }

  async store({ request, response }) {
    const data = request.only([
      'lh_1sigma',
      'll_1sigma',
      'lh_2sigma',
      'll_2sigma',
      'lh_3sigma',
      'll_3sigma',
      'usl',
      'lsl',
      'usl_rango',
      'lsl_rango',
      'media_historica',
      'media_rango_historica',
      'codigo_producto',
      'tendencia_id'
    ]);

    const transaction = await Database.transaction(async trx => {
      const codigoProducto = data.codigo_producto || null;

      await trx
        .table('limites')
        .where('tendencia_id', data.tendencia_id)
        .where('codigo_producto', codigoProducto)
        .update({ ultimo: false });

      data.ultimo = true;
      const limite = await Limite.create(data);

      return limite;
    });

    response.status(201).json(transaction);
  }

  async show({ request, response, params: { id } }) {
    const limite = await Limite.findOrFail(id);

    if (!limite) {
      response.status(404).json({
        message: 'Limite no encontrada.',
        id
      });
      return;
    }
    response.status(200).json(limite);
  }

  async update({ request, response, params: { id } }) {
    const data = request.only([
      'lh_1sigma',
      'll_1sigma',
      'lh_2sigma',
      'll_2sigma',
      'lh_3sigma',
      'll_3sigma',
      'usl',
      'lsl',
      'usl_rango',
      'lsl_rango',
      'media_historica',
      'media_rango_historica',
      'codigo_producto',
      'tendencia_id'
    ]);
    const limite = await Limite.find(id);

    if (!limite) {
      response.status(404).json({
        message: 'Limite no encontrada.',
        id
      });
      return;
    }
    limite.lh_1sigma = data.lh_1sigma || limite.lh_1sigma;
    limite.ll_1sigma = data.ll_1sigma || limite.ll_1sigma;
    limite.lh_2sigma = data.lh_2sigma || limite.lh_2sigma;
    limite.ll_2sigma = data.ll_2sigma || limite.ll_2sigma;
    limite.lh_3sigma = data.lh_3sigma || limite.lh_3sigma;
    limite.ll_3sigma = data.ll_3sigma || limite.ll_3sigma;
    limite.usl = data.usl || limite.usl;
    limite.lsl = data.lsl || limite.lsl;
    limite.usl_rango = data.usl_rango || limite.usl_rango;
    limite.lsl_rango = data.lsl_rango || limite.lsl_rango;
    limite.media_historica = data.media_historica || limite.media_historica;
    limite.media_rango_historica = data.media_rango_historica || limite.media_rango_historica;
    limite.codigo_producto = data.codigo_producto || limite.codigo_producto;
    limite.tendencia_id = data.tendencia_id || limite.tendencia_id;
    await limite.save();

    response.status(200).json(limite);
  }

  async destroy({ request, response, params: { id } }) {
    const limite = await Limite.find(id);

    if (!limite) {
      response.status(404).json({
        message: 'Limite no encontrada.',
        id
      });
      return;
    }

    const tendencia_id = limite.tendencia_id;
    const transaction = await Database.transaction(async trx => {
      await limite.delete();

      await trx
        .table('limites')
        .where('tendencia_id', limite.tendencia_id)
        .update({ ultimo: false });

      const limiteUpdate = await Limite.query()
        .orderBy('created_at', 'DESC')
        .where('tendencia_id', tendencia_id)
        .whereNot('id', id)
        .first();

      await trx
        .table('limites')
        .where('id', limiteUpdate.id)
        .update({ ultimo: true });

      return limiteUpdate;
    });

    response.status(201).json(transaction);
  }


  async limiteByHistoricos ({ request, response }) {
    const data = request.only([
      'tendencia',
      'codigo_producto'
    ]);
    const codigoProducto = data.codigo_producto || null;
    
    const historicos = await Database
      .table('historicos')
      .where('tendencia_id', data.tendencia)
      .orderBy('fecha', 'ASC')
      .offset(0)
      .limit(30)
         

    // Calculo datos necesarios para limites
    let pv = historicos.map(item => {
      return item.pv
    })

    let rangos = pv
      .map((item, i) => {
        if (i < pv.length - 1) {
          return mathjs.round(Math.abs(pv[i + 1] - pv[i]), 2)
        }
      })
      .filter(item => {
        if (item) {
          return true
        }
      })

    let std = mathjs.std(pv)
    let std_rango = mathjs.std(rangos)
    let media = mathjs.mean(pv)
    let media_rango = mathjs.median(rangos)

    const lh_1sigma = media + std*1
    const ll_1sigma = media - std*1
    const lh_2sigma = media + std*2
    const ll_2sigma = media - std*2
    const lh_3sigma = media + std*3
    const ll_3sigma = media - std*3
    const usl = media + std*4
    const lsl = media - std*4
    const usl_rango = media_rango + std_rango*1
    const lsl_rango = media_rango + std_rango*1
    const media_historica = media
    const media_rango_historica = media_rango

    const limite = {
        lh_1sigma: mathjs.round(lh_1sigma, 2),
        ll_1sigma: mathjs.round(ll_1sigma, 2),
        lh_2sigma: mathjs.round(lh_2sigma, 2),
        ll_2sigma: mathjs.round(ll_2sigma, 2),
        lh_3sigma: mathjs.round(lh_3sigma, 2),
        ll_3sigma: mathjs.round(ll_3sigma, 2),
        usl: mathjs.round(usl, 2),
        lsl: mathjs.round(lsl, 2),
        usl_rango: mathjs.round(usl_rango, 2),
        lsl_rango: mathjs.round(lsl_rango, 2),
        media_historica: mathjs.round(media_historica, 2),
        media_rango_historica: mathjs.round(media_rango_historica, 2),
        codigo_producto: codigoProducto,
        tendencia_id: data.tendencia
    }


    response.status(200).json(limite);
  }
}

module.exports = LimiteController;
