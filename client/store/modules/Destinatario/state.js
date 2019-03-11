const state = {
  destinatario: null,
  destinatarios: [],
  modalAgregarDestinatario: false,
  modalEditarDestinatario: false,
  modalEliminarDestinatario: false,
  payloadDestinatarios: {
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
