const state = {
  alarma: null,
  alarmas: [],
  modalReconocerAlarma: false,
  modalAgregarAlarma: false,
  modalEditarAlarma: false,
  modalEliminarAlarma: false,
  payloadAlarmas: {
    params: {
      id: null,
      sortBy: 'descripcion',
      descending: 'descripcion' ? 'DESC' : 'ASC',
      page: 1,
      perPage: 100,
      search: '',
      searchField: 'descripcion'
    }
  }
}

export default state
