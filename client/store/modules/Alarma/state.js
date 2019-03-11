const state = {
  alarma: null,
  alarmas: [],
  modalAgregarAlarma: false,
  modalEditarAlarma: false,
  modalEliminarAlarma: false,
  payloadAlarmas: {
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

export default state
