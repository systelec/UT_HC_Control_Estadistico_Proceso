const getters = {
  tecnologia(state) {
    return state.tecnologia
  },
  tecnologias(state) {
    return state.tecnologias
  },
  modalAgregarTecnologia(state) {
    return state.modalAgregarTecnologia
  },
  modalEditarTecnologia(state) {
    return state.modalEditarTecnologia
  },
  modalEliminarTecnologia(state) {
    return state.modalEliminarTecnologia
  },
  modalRelacionarTecnologiaConMixer(state) {
    return state.modalRelacionarTecnologiaConMixer
  },
  payloadTecnologias(state) {
    return state.payloadTecnologias
  }
}

export default getters
