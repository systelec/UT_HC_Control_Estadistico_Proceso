const state = {
  mixer: null,
  mixers: [],
  modalAgregarMixer: false,
  modalEditarMixer: false,
  modalEliminarMixer: false,
  modalRelacionarMixerConProducto: false,
  payloadMixers: {
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
