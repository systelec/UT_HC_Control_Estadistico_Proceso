import { SET_HISTORICOS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllHistoricos(context) {
    await axios
      .get('historicos', this.state.Historico.payloadHistoricos)
      .then(response => {
        context.commit(SET_HISTORICOS, response.data)
      })
  },

  async createHistorico(context, historico) {
    await axios
      .post('historicos', historico)
      .then(response => {
        context.dispatch('getAllHistoricos')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateHistorico(context, historico) {
    await axios
      .put(`historicos/${this.state.Historico.historico.id}`, historico)
      .then(response => {
        context.dispatch('getAllHistoricos')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteHistorico(context) {
    await axios
      .delete(`historicos/${this.state.Historico.historico.id}`)
      .then(response => {
        context.dispatch('getAllHistoricos')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
