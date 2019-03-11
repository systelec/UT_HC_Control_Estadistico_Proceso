const state = {
  user: null,
  users: [],
  modalAgregarUser: false,
  modalEditarUser: false,
  modalEliminarUser: false,
  payloadUsers: {
    params: {
      id: null,
      sortBy: 'email',
      descending: 'email' ? 'DESC' : 'ASC',
      page: 1,
      perPage: 100,
      search: '',
      searchField: 'email'
    }
  }
}

export default state
