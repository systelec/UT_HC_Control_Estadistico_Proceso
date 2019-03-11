export const SET_PRODUCTO = 'SET_PRODUCTO'
export const SET_PRODUCTOS = 'SET_PRODUCTOS'
export const SET_MODAL_AGREGAR_PRODUCTO = 'SET_MODAL_AGREGAR_PRODUCTO'
export const SET_MODAL_EDITAR_PRODUCTO = 'SET_MODAL_EDITAR_PRODUCTO'
export const SET_MODAL_ELIMINAR_PRODUCTO = 'SET_MODAL_ELIMINAR_PRODUCTO'
export const SET_PAYLOAD_PRODUCTOS = 'SET_PAYLOAD_PRODUCTOS'
export const CLEAR_PAYLOAD_PRODUCTOS = 'CLEAR_PAYLOAD_PRODUCTOS'

const mutations = {
  [SET_PRODUCTO](state, producto) {
    state.producto = producto
  },
  [SET_PRODUCTOS](state, productos) {
    state.productos = productos
  },
  [SET_MODAL_AGREGAR_PRODUCTO](state, modal) {
    state.modalAgregarProducto = modal
  },
  [SET_MODAL_EDITAR_PRODUCTO](state, modal) {
    state.modalEditarProducto = modal
  },
  [SET_MODAL_ELIMINAR_PRODUCTO](state, modal) {
    state.modalEliminarProducto = modal
  },
  [SET_PAYLOAD_PRODUCTOS](state, payload) {
    state.payloadProductos = payload
  },
  [CLEAR_PAYLOAD_PRODUCTOS](state, payload) {
    state.payloadProductos = {
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
}

export default mutations
