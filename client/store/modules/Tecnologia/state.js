const state = {
  tecnologia: null,
  tecnologias: [],
  modalAgregarTecnologia: false,
  modalEditarTecnologia: false,
  modalEliminarTecnologia: false,
  modalRelacionarTecnologiaConMixer: false,
  payloadTecnologias: {
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
