import { SET_LIMITES } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllLimites(context) {
    await axios
      .get('limites', this.state.Limite.payloadLimites)
      .then(response => {
        context.commit(SET_LIMITES, response.data)
      })
  },
  
  async createLimite(context, limite) {
    await axios
      .post('limites', limite)
      .then(response => {
        context.dispatch('getAllTendencias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateLimite(context, limite) {
    await axios
      .put(`limites/${this.state.Limite.limite.id}`, limite)
      .then(response => {
        context.dispatch('getAllTendencias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteLimite(context) {
    await axios
      .delete(`limites/${this.state.Limite.limite.id}`)
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
