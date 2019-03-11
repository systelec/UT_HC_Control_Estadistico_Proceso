import { SET_TECNOLOGIAS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllTecnologias(context) {
    await axios
      .get('tecnologias', this.state.Tecnologia.payloadTecnologias)
      .then(response => {
        context.commit(SET_TECNOLOGIAS, response.data)
      })
  },

  async createTecnologia(context, tecnologia) {
    await axios
      .post('tecnologias', tecnologia)
      .then(response => {
        context.dispatch('getAllTecnologias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async relationsTecnologiaMixers(context, mixers) {
    await axios
      .post(`tecnologias/${this.state.Tecnologia.tecnologia.id}/mixers`, mixers)
      .then(response => {
        context.dispatch('getAllTecnologias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateTecnologia(context, tecnologia) {
    await axios
      .put(`tecnologias/${this.state.Tecnologia.tecnologia.id}`, tecnologia)
      .then(response => {
        context.dispatch('getAllTecnologias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteTecnologia(context) {
    await axios
      .delete(`tecnologias/${this.state.Tecnologia.tecnologia.id}`)
      .then(response => {
        context.dispatch('getAllTecnologias')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
