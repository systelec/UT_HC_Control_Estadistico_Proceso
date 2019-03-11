const getters = {
  alarma(state) {
    return state.alarma
  },
  alarmas(state) {
    return state.alarmas
  },
  modalAgregarAlarma(state) {
    return state.modalAgregarAlarma
  },
  modalEditarAlarma(state) {
    return state.modalEditarAlarma
  },
  modalEliminarAlarma(state) {
    return state.modalEliminarAlarma
  },
  payloadAlarmas(state) {
    return state.payloadAlarmas
  }
}

export default getters
