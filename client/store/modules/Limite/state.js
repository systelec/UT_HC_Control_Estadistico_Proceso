import moment from 'moment'

const state = {
  limite: null,
  limites: [],
  modalAgregarLimite: false,
  modalEditarLimite: false,
  modalEliminarLimite: false,
  payloadLimites: {
    params: {
      tendencia: 6,
      desde: moment()
        .add(-100, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      hasta: moment().format('YYYY-MM-DD HH:mm:ss'),
      productos: []
    }
  }
}

export default state
