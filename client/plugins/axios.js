import axios from 'axios'

export default axios.create({
  baseURL: 'api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})
