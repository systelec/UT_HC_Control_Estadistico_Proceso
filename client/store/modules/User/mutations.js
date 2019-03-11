export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const SET_MODAL_AGREGAR_USER = 'SET_MODAL_AGREGAR_USER'
export const SET_MODAL_EDITAR_USER = 'SET_MODAL_EDITAR_USER'
export const SET_MODAL_ELIMINAR_USER = 'SET_MODAL_ELIMINAR_USER'
export const SET_PAYLOAD_USERS = 'SET_PAYLOAD_USERS'
export const CLEAR_PAYLOAD_USERS = 'CLEAR_PAYLOAD_USERS'

const mutations = {
  [SET_USER](state, user) {
    state.user = user
  },
  [SET_USERS](state, users) {
    state.users = users
  },
  [SET_MODAL_AGREGAR_USER](state, modal) {
    state.modalAgregarUser = modal
  },
  [SET_MODAL_EDITAR_USER](state, modal) {
    state.modalEditarUser = modal
  },
  [SET_MODAL_ELIMINAR_USER](state, modal) {
    state.modalEliminarUser = modal
  },
  [SET_PAYLOAD_USERS](state, payload) {
    state.payloadUsers = payload
  },
  [CLEAR_PAYLOAD_USERS](state, payload) {
    state.payloadUsers = {
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
