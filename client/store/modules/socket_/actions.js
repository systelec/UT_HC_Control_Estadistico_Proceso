import {
  SOCKET_VARIABLES_TENDENCIA_TIEMPO_REAL,
  SET_VARIABLES_TENDENCIA_HISTORICAS
} from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getHistoricos(context, payload) {
    await axios
      .get(`historicos`, {
        params: {
          filter: payload.filter
        }
      })
      .then(response => {
        context.commit(SET_VARIABLES_TENDENCIA_HISTORICAS, response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  async changeRealTime(context, payload) {
    await axios
      .post(
        `tendencias/${
          this.state.socket.tendenciaSeleccionada.Bloque_ID
        }/tiempo_real`,
        {
          productos: payload.params.productos
        }
      )
      .then(response => {
        context.commit(SET_VARIABLES_TENDENCIA_HISTORICAS, response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  async getHistoricosTv1(context, payload) {
    await axios
      .post(
        `tendencias/${
          this.state.socket.variablesTendenciaTimpoReal.Bloque_ID
        }/historicos`
      )
      .then(response => {
        context.commit(SET_VARIABLES_TV1_HISTORICAS, response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default actions
