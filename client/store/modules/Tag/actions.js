import { SET_TAGS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllTags(context, payload) {
    payload = payload || {}
    await axios
      .get('tags', {
        params: payload.query
      })
      .then(response => {
        context.commit(SET_TAGS, response.data)
      })
  },

  async createTag(context, payload) {
    await axios
      .post('tags', payload.content)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateTag(context, payload) {
    await axios
      .put(`tags/${this.state.Tag.tag.id}`, payload.content)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteTag(context, payload) {
    await axios
      .delete(`tags/${this.state.Tag.tag.id}`)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
