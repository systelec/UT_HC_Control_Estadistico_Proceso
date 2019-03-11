const getters = {
  user(state) {
    return state.user
  },
  users(state) {
    return state.users
  },
  modalAgregarUser(state) {
    return state.modalAgregarUser
  },
  modalEditarUser(state) {
    return state.modalEditarUser
  },
  modalEliminarUser(state) {
    return state.modalEliminarUser
  },
  payloadUsers(state) {
    return state.payloadUsers
  }
}

export default getters
