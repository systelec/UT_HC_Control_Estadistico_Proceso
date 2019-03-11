export const SET_TENDENCIA = 'SET_TENDENCIA'
export const SET_TENDENCIAS = 'SET_TENDENCIAS'
export const SET_MODAL_AGREGAR_TENDENCIA = 'SET_MODAL_AGREGAR_TENDENCIA'
export const SET_MODAL_EDITAR_TENDENCIA = 'SET_MODAL_EDITAR_TENDENCIA'
export const SET_MODAL_ELIMINAR_TENDENCIA = 'SET_MODAL_ELIMINAR_TENDENCIA'
export const SET_PAYLOAD_TENDENCIAS = 'SET_PAYLOAD_TENDENCIAS'
export const CLEAR_PAYLOAD_TENDENCIAS = 'CLEAR_PAYLOAD_TENDENCIAS'

const mutations = {
  [SET_TENDENCIA](state, tendencia) {
    state.tendencia = tendencia
  },
  [SET_TENDENCIAS](state, tendencias) {
    state.tendencias = tendencias
  },
  [SET_MODAL_AGREGAR_TENDENCIA](state, modal) {
    state.modalAgregarTendencia = modal
  },
  [SET_MODAL_EDITAR_TENDENCIA](state, modal) {
    state.modalEditarTendencia = modal
  },
  [SET_MODAL_ELIMINAR_TENDENCIA](state, modal) {
    state.modalEliminarTendencia = modal
  },
  [SET_PAYLOAD_TENDENCIAS](state, payload) {
    state.payloadTendencias = payload
  },
  [CLEAR_PAYLOAD_TENDENCIAS](state, payload) {
    state.payloadTendencias = {
      params: {
        id: null,
        sortBy: 'nombre',
        descending: 'nombre' ? 'DESC' : 'ASC',
        page: 1,
        perPage: 100,
        search: '',
        searchField: 'nombre'
      }
    }
  }
}

export default mutations
