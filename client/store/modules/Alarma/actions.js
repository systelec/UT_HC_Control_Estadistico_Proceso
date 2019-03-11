import { SET_ALARMAS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllAlarmas(context) {
    await axios
      .get('alarmas', this.state.Alarma.payloadAlarmas)
      .then(response => {
        context.commit(SET_ALARMAS, response.data)
      })
  },

  async createAlarma(context, alarma) {
    await axios
      .post('alarmas', alarma)
      .then(response => {
        context.dispatch('getAllAlarmas')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateAlarma(context, alarma) {
    await axios
      .put(`alarmas/${this.state.Alarma.alarma.id}`, alarma)
      .then(response => {
        context.dispatch('getAllAlarmas')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteAlarma(context) {
    await axios
      .delete(`alarmas/${this.state.Alarma.alarma.id}`)
      .then(response => {
        context.dispatch('getAllAlarmas')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
