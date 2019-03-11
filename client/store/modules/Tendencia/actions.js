import { SET_TENDENCIAS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllTendencias(context) {
    await axios
      .get('tendencias', this.state.Tendencia.payloadTendencias)
      .then(response => {
        context.commit(SET_TENDENCIAS, response.data)
      })
  },

  async createTendencia(context, tendencia) {
    await axios
      .post('tendencias', tendencia)
      .then(response => {
        context.dispatch('getAllTendencias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateTendencia(context, tendencia) {
    await axios
      .put(`tendencias/${this.state.Tendencia.tendencia.id}`, tendencia)
      .then(response => {
        context.dispatch('getAllTendencias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteTendencia(context) {
    await axios
      .delete(`tendencias/${this.state.Tendencia.tendencia.id}`)
      .then(response => {
        context.dispatch('getAllTendencias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
