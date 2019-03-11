export const SET_LIMITE = 'SET_LIMITE'
export const SET_LIMITES = 'SET_LIMITES'
export const SET_MODAL_AGREGAR_LIMITE = 'SET_MODAL_AGREGAR_LIMITE'
export const SET_MODAL_EDITAR_LIMITE = 'SET_MODAL_EDITAR_LIMITE'
export const SET_MODAL_ELIMINAR_LIMITE = 'SET_MODAL_ELIMINAR_LIMITE'
export const SET_PAYLOAD_LIMITES = 'SET_PAYLOAD_LIMITES'
export const CLEAR_PAYLOAD_LIMITES = 'CLEAR_PAYLOAD_LIMITES'

import moment from 'moment'

const mutations = {
  [SET_LIMITE](state, limite) {
    state.limite = limite
  },
  [SET_LIMITES](state, limites) {
    state.limites = limites
  },
  [SET_MODAL_AGREGAR_LIMITE](state, modal) {
    state.modalAgregarLimite = modal
  },
  [SET_MODAL_EDITAR_LIMITE](state, modal) {
    state.modalEditarLimite = modal
  },
  [SET_MODAL_ELIMINAR_LIMITE](state, modal) {
    state.modalEliminarLimite = modal
  },
  [SET_PAYLOAD_LIMITES](state, payload) {
    state.payloadLimites = payload
  },
  [CLEAR_PAYLOAD_LIMITES](state, payload) {
    state.payloadLimites = {
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
}

export default mutations
