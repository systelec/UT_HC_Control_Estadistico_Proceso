import { SET_DESTINATARIOS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllDestinatarios(context) {
    await axios
      .get('destinatarios', this.state.Destinatario.payloadDestinatarios)
      .then(response => {
        context.commit(SET_DESTINATARIOS, response.data)
      })
  },

  async createDestinatario(context, destinatario) {
    await axios
      .post('destinatarios', destinatario)
      .then(response => {
        context.dispatch('getAllDestinatarios')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateDestinatario(context, destinatario) {
    await axios
      .put(
        `destinatarios/${this.state.Destinatario.destinatario.id}`,
        destinatario
      )
      .then(response => {
        context.dispatch('getAllDestinatarios')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteDestinatario(context) {
    await axios
      .delete(`destinatarios/${this.state.Destinatario.destinatario.id}`)
      .then(response => {
        context.dispatch('getAllDestinatarios')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
