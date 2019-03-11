const state = {
  producto: null,
  productos: [],
  modalAgregarProducto: false,
  modalEditarProducto: false,
  modalEliminarProducto: false,
  payloadProductos: {
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
