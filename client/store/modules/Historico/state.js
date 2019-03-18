import moment from 'moment'

const state = {
  historico: null,
  historicos: null,
  historicosFiltradosPorProducto: [],
  tendenciaHistorico: {
    tag: 'Dosif_LAS'
  },
  productosHistorico: null,
  modalAgregarHistorico: false,
  modalEditarHistorico: false,
  modalEliminarHistorico: false,
  payloadHistoricos: {
    params: {
      tendencia: 1,
      desde: moment()
        .add(-100, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      hasta: moment().format('YYYY-MM-DD HH:mm:ss'),
      productos: []
    }
  }
}

export default state
