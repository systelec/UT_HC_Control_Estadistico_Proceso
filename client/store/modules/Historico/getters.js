const getters = {
  historico(state) {
    return state.historico
  },
  historicos(state) {
    return state.historicos
  },
  historicosFiltradosPorProducto(state) {
    return state.historicosFiltradosPorProducto
  },
  tendenciaHistorico(state) {
    return state.tendenciaHistorico
  },
  productosHistorico(state) {
    return state.productosHistorico
  },
  modalAgregarHistorico(state) {
    return state.modalAgregarHistorico
  },
  modalEditarHistorico(state) {
    return state.modalEditarHistorico
  },
  modalEliminarHistorico(state) {
    return state.modalEliminarHistorico
  },
  payloadHistoricos(state) {
    return state.payloadHistoricos
  }
}

export default getters
