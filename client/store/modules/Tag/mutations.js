export const SET_TAG = 'SET_TAG'
export const SET_TAGS = 'SET_TAGS'
export const SET_MODAL_AGREGAR_TAG = 'SET_MODAL_AGREGAR_TAG'
export const SET_MODAL_EDITAR_TAG = 'SET_MODAL_EDITAR_TAG'
export const SET_MODAL_ELIMINAR_TAG = 'SET_MODAL_ELIMINAR_TAG'

const mutations = {
  [SET_TAG](state, tag) {
    state.tag = tag
  },
  [SET_TAGS](state, tags) {
    state.tags = tags
  },
  [SET_MODAL_AGREGAR_TAG](state, modal) {
    state.modalAgregarTag = modal
  },
  [SET_MODAL_EDITAR_TAG](state, modal) {
    state.modalEditarTag = modal
  },
  [SET_MODAL_ELIMINAR_TAG](state, modal) {
    state.modalEliminarTag = modal
  }
}

export default mutations
