const getters = {
  limite(state) {
    return state.limite
  },
  limites(state) {
    return state.limites
  },
  limiteFiltradoPorProducto(state) {
    return state.limiteFiltradoPorProducto
  },
  modalAgregarLimite(state) {
    return state.modalAgregarLimite
  },
  modalEditarLimite(state) {
    return state.modalEditarLimite
  },
  modalEliminarLimite(state) {
    return state.modalEliminarLimite
  },
  payloadLimites(state) {
    return state.payloadLimites
  }
}

export default getters
