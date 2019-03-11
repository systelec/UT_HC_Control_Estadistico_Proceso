import { SET_MIXERS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllMixers(context) {
    await axios.get('mixers', this.state.Mixer.payloadMixers).then(response => {
      context.commit(SET_MIXERS, response.data)
    })
  },

  async createMixer(context, mixer) {
    await axios
      .post('mixers', mixer)
      .then(response => {
        context.dispatch('getAllMixers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async relationsMixerProductos(context, productos) {
    await axios
      .post(`mixers/${this.state.Mixer.mixer.id}/productos`, productos)
      .then(response => {
        context.dispatch('getAllMixers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateMixer(context, mixer) {
    await axios
      .put(`mixers/${this.state.Mixer.mixer.id}`, mixer)
      .then(response => {
        context.dispatch('getAllMixers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteMixer(context) {
    await axios
      .delete(`mixers/${this.state.Mixer.mixer.id}`)
      .then(response => {
        context.dispatch('getAllMixers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
