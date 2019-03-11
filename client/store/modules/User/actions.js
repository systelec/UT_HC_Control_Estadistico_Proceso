import { SET_USERS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllUsers(context) {
    await axios.get('users', this.state.User.payloadUsers).then(response => {
      context.commit(SET_USERS, response.data)
    })
  },

  async createUser(context, user) {
    await axios
      .post('users', user)
      .then(response => {
        context.dispatch('getAllUsers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateUser(context, user) {
    await axios
      .put(`users/${this.state.User.user.id}`, user)
      .then(response => {
        context.dispatch('getAllUsers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteUser(context) {
    await axios
      .delete(`users/${this.state.User.user.id}`)
      .then(response => {
        context.dispatch('getAllUsers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
