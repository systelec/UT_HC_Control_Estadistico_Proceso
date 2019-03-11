const state = {
  tendencia: null,
  tendencias: [],
  modalAgregarTendencia: false,
  modalEditarTendencia: false,
  modalEliminarTendencia: false,
  payloadTendencias: {
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

export default state
