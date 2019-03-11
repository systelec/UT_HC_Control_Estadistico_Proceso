export const SET_ALARMA = 'SET_ALARMA'
export const SET_ALARMAS = 'SET_ALARMAS'
export const SET_MODAL_AGREGAR_ALARMA = 'SET_MODAL_AGREGAR_ALARMA'
export const SET_MODAL_EDITAR_ALARMA = 'SET_MODAL_EDITAR_ALARMA'
export const SET_MODAL_ELIMINAR_ALARMA = 'SET_MODAL_ELIMINAR_ALARMA'
export const SET_PAYLOAD_ALARMAS = 'SET_PAYLOAD_ALARMAS'
export const CLEAR_PAYLOAD_ALARMAS = 'CLEAR_PAYLOAD_ALARMAS'

const mutations = {
  [SET_ALARMA](state, alarma) {
    state.alarma = alarma
  },
  [SET_ALARMAS](state, alarmas) {
    state.alarmas = alarmas
  },
  [SET_MODAL_AGREGAR_ALARMA](state, modal) {
    state.modalAgregarAlarma = modal
  },
  [SET_MODAL_EDITAR_ALARMA](state, modal) {
    state.modalEditarAlarma = modal
  },
  [SET_MODAL_ELIMINAR_ALARMA](state, modal) {
    state.modalEliminarAlarma = modal
  },
  [SET_PAYLOAD_ALARMAS](state, payload) {
    state.payloadAlarmas = payload
  },
  [CLEAR_PAYLOAD_ALARMAS](state, payload) {
    state.payloadAlarmas = {
      params: {
        id: null,
        sortBy: 'codigo',
        descending: 'codigo' ? 'DESC' : 'ASC',
        page: 1,
        perPage: 100,
        search: '',
        searchField: 'codigo'
      }
    }
  }
}

export default mutations
