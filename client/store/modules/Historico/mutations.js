export const SET_HISTORICO = 'SET_HISTORICO'
export const SET_HISTORICOS = 'SET_HISTORICOS'
export const SET_TENDENCIA_HISTORICO = 'SET_TENDENCIA_HISTORICO'
export const SET_PRODUCTOS_HISTORICO = 'SET_PRODUCTOS_HISTORICO'
export const SET_MODAL_AGREGAR_HISTORICO = 'SET_MODAL_AGREGAR_HISTORICO'
export const SET_MODAL_EDITAR_HISTORICO = 'SET_MODAL_EDITAR_HISTORICO'
export const SET_MODAL_ELIMINAR_HISTORICO = 'SET_MODAL_ELIMINAR_HISTORICO'
export const SET_PAYLOAD_HISTORICOS = 'SET_PAYLOAD_HISTORICOS'
export const CLEAR_PAYLOAD_HISTORICOS = 'CLEAR_PAYLOAD_HISTORICOS'

import moment from 'moment'

const mutations = {
  [SET_HISTORICO](state, historico) {
    state.historico = historico
  },
  [SET_HISTORICOS](state, historicos) {
    state.historicos = historicos
  },
  [SET_TENDENCIA_HISTORICO](state, tendencias) {
    state.tendenciaHistorico = tendencias
  },
  [SET_PRODUCTOS_HISTORICO](state, productos) {
    state.productosHistorico = productos
  },
  [SET_MODAL_AGREGAR_HISTORICO](state, modal) {
    state.modalAgregarHistorico = modal
  },
  [SET_MODAL_EDITAR_HISTORICO](state, modal) {
    state.modalEditarHistorico = modal
  },
  [SET_MODAL_ELIMINAR_HISTORICO](state, modal) {
    state.modalEliminarHistorico = modal
  },
  [SET_PAYLOAD_HISTORICOS](state, payload) {
    state.payloadHistoricos = payload
  },
  [CLEAR_PAYLOAD_HISTORICOS](state, payload) {
    state.payloadHistoricos = {
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
