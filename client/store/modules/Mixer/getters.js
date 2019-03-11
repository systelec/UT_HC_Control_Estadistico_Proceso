const getters = {
  mixer(state) {
    return state.mixer
  },
  mixers(state) {
    return state.mixers
  },
  modalAgregarMixer(state) {
    return state.modalAgregarMixer
  },
  modalEditarMixer(state) {
    return state.modalEditarMixer
  },
  modalEliminarMixer(state) {
    return state.modalEliminarMixer
  },
  modalRelacionarMixerConProducto(state) {
    return state.modalRelacionarMixerConProducto
  },
  payloadMixers(state) {
    return state.payloadMixers
  }
}

export default getters
