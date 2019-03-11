import { SET_PRODUCTOS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllProductos(context) {
    await axios
      .get('productos', this.state.Producto.payloadProductos)
      .then(response => {
        context.commit(SET_PRODUCTOS, response.data)
      })
  },

  async createProducto(context, producto) {
    await axios
      .post('productos', producto)
      .then(response => {
        context.dispatch('getAllProductos')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateProducto(context, producto) {
    await axios
      .put(`productos/${this.state.Producto.producto.id}`, producto)
      .then(response => {
        context.dispatch('getAllProductos')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteProducto(context) {
    await axios
      .delete(`productos/${this.state.Producto.producto.id}`)
      .then(response => {
        context.dispatch('getAllProductos')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
