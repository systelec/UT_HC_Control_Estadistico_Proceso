export const SET_MODO_REAL_TIME = 'SET_MODO_REAL_TIME'
export const SET_TENDENCIA_SELECCIONADA = 'SET_TENDENCIA_SELECCIONADA'
export const SOCKET_VARIABLES_TENDENCIA_TIEMPO_REAL =
  'SOCKET_VARIABLES_TENDENCIA_TIEMPO_REAL'
export const SET_VARIABLES_TENDENCIA_HISTORICAS =
  'SET_VARIABLES_TENDENCIA_HISTORICAS'
export const SOCKET_VARIABLES_TV1_TIEMPO_REAL =
  'SOCKET_VARIABLES_TV1_TIEMPO_REAL'
export const SET_VARIABLES_TV1_HISTORICAS = 'SET_VARIABLES_TV1_HISTORICAS'
export const SET_ACTUALIZAR_TV1_GRAFICO = 'SET_ACTUALIZAR_TV1_GRAFICO'
export const SOCKET_VARIABLES_TV2_TIEMPO_REAL =
  'SOCKET_VARIABLES_TV2_TIEMPO_REAL'
export const SET_VARIABLES_TV2_HISTORICAS = 'SET_VARIABLES_TV2_HISTORICAS'
export const SET_ACTUALIZAR_TV2_GRAFICO = 'SET_ACTUALIZAR_TV2_GRAFICO'
export const SOCKET_VARIABLES_TV3_TIEMPO_REAL =
  'SOCKET_VARIABLES_TV3_TIEMPO_REAL'
export const SET_VARIABLES_TV3_HISTORICAS = 'SET_VARIABLES_TV3_HISTORICAS'
export const SET_ACTUALIZAR_TV3_GRAFICO = 'SET_ACTUALIZAR_TV3_GRAFICO'
export const SOCKET_VARIABLES_TV4_TIEMPO_REAL =
  'SOCKET_VARIABLES_TV4_TIEMPO_REAL'
export const SET_VARIABLES_TV4_HISTORICAS = 'SET_VARIABLES_TV4_HISTORICAS'
export const SET_ACTUALIZAR_TV4_GRAFICO = 'SET_ACTUALIZAR_TV4_GRAFICO'
export const SOCKET_VARIABLES_TV5_TIEMPO_REAL =
  'SOCKET_VARIABLES_TV5_TIEMPO_REAL'
export const SET_VARIABLES_TV5_HISTORICAS = 'SET_VARIABLES_TV5_HISTORICAS'
export const SET_ACTUALIZAR_TV5_GRAFICO = 'SET_ACTUALIZAR_TV5_GRAFICO'
export const SOCKET_VARIABLES_TV6_TIEMPO_REAL =
  'SOCKET_VARIABLES_TV6_TIEMPO_REAL'
export const SET_VARIABLES_TV6_HISTORICAS = 'SET_VARIABLES_TV6_HISTORICAS'
export const SET_ACTUALIZAR_TV6_GRAFICO = 'SET_ACTUALIZAR_TV6_GRAFICO'

import axios from '@/plugins/axios'

const mutations = {
  [SET_MODO_REAL_TIME](state, modo) {
    state.modoRealTime = modo
  },
  [SET_TENDENCIA_SELECCIONADA](state, tendenciaSeleccionada) {
    state.tendenciaSeleccionada = tendenciaSeleccionada
  },
  [SET_VARIABLES_TENDENCIA_HISTORICAS](state, variablesTendenciaHistoricas) {
    state.variablesTendenciaHistoricas = variablesTendenciaHistoricas
  },
  [SOCKET_VARIABLES_TENDENCIA_TIEMPO_REAL](state, variablesTendenciaTimpoReal) {
    state.variablesTendenciaTimpoReal = variablesTendenciaTimpoReal[0]
    if (state.modoRealTime) {
      let tendenciaTiempoReal = variablesTendenciaTimpoReal[0].find(item => {
        if (state.tendenciaSeleccionada) {
          if (
            parseInt(item.Bloque_ID) ===
            parseInt(state.tendenciaSeleccionada.Bloque_ID)
          ) {
            return true
          }
        }
        return false
      })

      if (tendenciaTiempoReal) {
        let tendenciaHistorica = state.variablesTendenciaHistoricas
        state.variablesTendenciaTimpoReal = tendenciaTiempoReal
        if (tendenciaHistorica && state.modoRealTime) {
          if (
            parseInt(tendenciaTiempoReal.Bloque_ID) ===
            parseInt(tendenciaHistorica.Bloque_ID)
          ) {
            state.variablesTendenciaHistoricas.Historicos = state.variablesTendenciaHistoricas.Historicos.concat(
              tendenciaTiempoReal.Historicos
            )
            state.variablesTendenciaHistoricas.Limites =
              tendenciaTiempoReal.Limites
            if (state.variablesTendenciaHistoricas.Historicos.length > 100) {
              state.variablesTendenciaHistoricas.Historicos.shift()
            }
            state.actualizarTendenciaHistoricas = !state.actualizarTendenciaHistoricas
          }
        }
      }
    }
  },
  [SET_ACTUALIZAR_TV1_GRAFICO](state, actualizarTv1Grafico) {
    state.actualizarTv1Grafico = actualizarTv1Grafico
  },
  [SET_VARIABLES_TV1_HISTORICAS](state, variablesTv1Historicas) {
    state.variablesTv1Historicas = variablesTv1Historicas
  },
  async [SOCKET_VARIABLES_TV1_TIEMPO_REAL](state, variablesTv1TiempoReal) {
    state.variablesTv1TiempoReal = variablesTv1TiempoReal
    let bloqueIdHistorico = state.variablesTv1Historicas
      ? parseInt(state.variablesTv1Historicas.Bloque_ID)
      : 0
    let bloqueIdTiempoReal = variablesTv1TiempoReal
      ? parseInt(variablesTv1TiempoReal[0].Bloque_ID)
      : 0

    if (bloqueIdHistorico === bloqueIdTiempoReal) {
      state.loadingTv1Grafico = false
      state.variablesTv1Historicas.Hasta = variablesTv1TiempoReal[0].Hasta
      state.variablesTv1Historicas.Fuera_Limite =
        variablesTv1TiempoReal[0].Fuera_Limite
      if (variablesTv1TiempoReal[0].Historicos.length > 0) {
        state.variablesTv1Historicas.Historicos = state.variablesTv1Historicas.Historicos.concat(
          variablesTv1TiempoReal[0].Historicos
        )
        state.variablesTv1Historicas.Limite = variablesTv1TiempoReal[0].Limite
        if (state.variablesTv1Historicas.Historicos.length > 100) {
          state.variablesTv1Historicas.Historicos.shift()
        }
        state.actualizarTv1Grafico = !state.actualizarTv1Grafico
      }
    } else {
      await axios
        .get(`tendencias/${bloqueIdTiempoReal}/historicos`)
        .then(response => {
          state.loadingTv1Grafico = false
          state.variablesTv1Historicas = response.data
          state.actualizarTv1Grafico = !state.actualizarTv1Grafico
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  [SET_ACTUALIZAR_TV2_GRAFICO](state, actualizarTv2Grafico) {
    state.actualizarTv2Grafico = actualizarTv2Grafico
  },
  [SET_VARIABLES_TV2_HISTORICAS](state, variablesTv2Historicas) {
    state.variablesTv2Historicas = variablesTv2Historicas
  },
  async [SOCKET_VARIABLES_TV2_TIEMPO_REAL](state, variablesTv2TiempoReal) {
    state.variablesTv2TiempoReal = variablesTv2TiempoReal
    let bloqueIdHistorico = state.variablesTv2Historicas
      ? parseInt(state.variablesTv2Historicas.Bloque_ID)
      : 0
    let bloqueIdTiempoReal = variablesTv2TiempoReal
      ? parseInt(variablesTv2TiempoReal[0].Bloque_ID)
      : 0

    if (bloqueIdHistorico === bloqueIdTiempoReal) {
      state.loadingTv2Grafico = false
      state.variablesTv2Historicas.Hasta = variablesTv2TiempoReal[0].Hasta
      state.variablesTv2Historicas.Fuera_Limite =
        variablesTv2TiempoReal[0].Fuera_Limite
      if (variablesTv2TiempoReal[0].Historicos.length > 0) {
        state.variablesTv2Historicas.Historicos = state.variablesTv2Historicas.Historicos.concat(
          variablesTv2TiempoReal[0].Historicos
        )
        state.variablesTv2Historicas.Limite = variablesTv2TiempoReal[0].Limite
        if (state.variablesTv2Historicas.Historicos.length > 100) {
          state.variablesTv2Historicas.Historicos.shift()
        }
        state.actualizarTv2Grafico = !state.actualizarTv2Grafico
      }
    } else {
      await axios
        .get(`tendencias/${bloqueIdTiempoReal}/historicos`)
        .then(response => {
          state.loadingTv2Grafico = false
          state.variablesTv2Historicas = response.data
          state.actualizarTv2Grafico = !state.actualizarTv2Grafico
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  [SET_ACTUALIZAR_TV3_GRAFICO](state, actualizarTv3Grafico) {
    state.actualizarTv3Grafico = actualizarTv3Grafico
  },
  [SET_VARIABLES_TV3_HISTORICAS](state, variablesTv3Historicas) {
    state.variablesTv3Historicas = variablesTv3Historicas
  },
  async [SOCKET_VARIABLES_TV3_TIEMPO_REAL](state, variablesTv3TiempoReal) {
    state.variablesTv3TiempoReal = variablesTv3TiempoReal
    let bloqueIdHistorico = state.variablesTv3Historicas
      ? parseInt(state.variablesTv3Historicas.Bloque_ID)
      : 0
    let bloqueIdTiempoReal = variablesTv3TiempoReal
      ? parseInt(variablesTv3TiempoReal[0].Bloque_ID)
      : 0

    if (bloqueIdHistorico === bloqueIdTiempoReal) {
      state.loadingTv3Grafico = false
      state.variablesTv3Historicas.Hasta = variablesTv3TiempoReal[0].Hasta
      state.variablesTv3Historicas.Fuera_Limite =
        variablesTv3TiempoReal[0].Fuera_Limite
      if (variablesTv3TiempoReal[0].Historicos.length > 0) {
        state.variablesTv3Historicas.Historicos = state.variablesTv3Historicas.Historicos.concat(
          variablesTv3TiempoReal[0].Historicos
        )
        state.variablesTv3Historicas.Limite = variablesTv3TiempoReal[0].Limite
        if (state.variablesTv3Historicas.Historicos.length > 100) {
          state.variablesTv3Historicas.Historicos.shift()
        }
        state.actualizarTv3Grafico = !state.actualizarTv3Grafico
      }
    } else {
      await axios
        .get(`tendencias/${bloqueIdTiempoReal}/historicos`)
        .then(response => {
          state.loadingTv3Grafico = false
          state.variablesTv3Historicas = response.data
          state.actualizarTv3Grafico = !state.actualizarTv3Grafico
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  [SET_ACTUALIZAR_TV4_GRAFICO](state, actualizarTv4Grafico) {
    state.actualizarTv4Grafico = actualizarTv4Grafico
  },
  [SET_VARIABLES_TV4_HISTORICAS](state, variablesTv4Historicas) {
    state.variablesTv4Historicas = variablesTv4Historicas
  },
  async [SOCKET_VARIABLES_TV4_TIEMPO_REAL](state, variablesTv4TiempoReal) {
    state.variablesTv4TiempoReal = variablesTv4TiempoReal
    let bloqueIdHistorico = state.variablesTv4Historicas
      ? parseInt(state.variablesTv4Historicas.Bloque_ID)
      : 0
    let bloqueIdTiempoReal = variablesTv4TiempoReal
      ? parseInt(variablesTv4TiempoReal[0].Bloque_ID)
      : 0

    if (bloqueIdHistorico === bloqueIdTiempoReal) {
      state.loadingTv4Grafico = false
      state.variablesTv4Historicas.Hasta = variablesTv4TiempoReal[0].Hasta
      state.variablesTv4Historicas.Fuera_Limite =
        variablesTv4TiempoReal[0].Fuera_Limite
      if (variablesTv4TiempoReal[0].Historicos.length > 0) {
        state.variablesTv4Historicas.Historicos = state.variablesTv4Historicas.Historicos.concat(
          variablesTv4TiempoReal[0].Historicos
        )
        state.variablesTv4Historicas.Limite = variablesTv4TiempoReal[0].Limite
        if (state.variablesTv4Historicas.Historicos.length > 100) {
          state.variablesTv4Historicas.Historicos.shift()
        }
        state.actualizarTv4Grafico = !state.actualizarTv4Grafico
      }
    } else {
      await axios
        .get(`tendencias/${bloqueIdTiempoReal}/historicos`)
        .then(response => {
          state.loadingTv4Grafico = false
          state.variablesTv4Historicas = response.data
          state.actualizarTv4Grafico = !state.actualizarTv4Grafico
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  [SET_ACTUALIZAR_TV5_GRAFICO](state, actualizarTv5Grafico) {
    state.actualizarTv5Grafico = actualizarTv5Grafico
  },
  [SET_VARIABLES_TV5_HISTORICAS](state, variablesTv5Historicas) {
    state.variablesTv5Historicas = variablesTv5Historicas
  },
  async [SOCKET_VARIABLES_TV5_TIEMPO_REAL](state, variablesTv5TiempoReal) {
    state.variablesTv5TiempoReal = variablesTv5TiempoReal
    let bloqueIdHistorico = state.variablesTv5Historicas
      ? parseInt(state.variablesTv5Historicas.Bloque_ID)
      : 0
    let bloqueIdTiempoReal = variablesTv5TiempoReal
      ? parseInt(variablesTv5TiempoReal[0].Bloque_ID)
      : 0

    if (bloqueIdHistorico === bloqueIdTiempoReal) {
      state.loadingTv5Grafico = false
      state.variablesTv5Historicas.Hasta = variablesTv5TiempoReal[0].Hasta
      state.variablesTv5Historicas.Fuera_Limite =
        variablesTv5TiempoReal[0].Fuera_Limite
      if (variablesTv5TiempoReal[0].Historicos.length > 0) {
        state.variablesTv5Historicas.Historicos = state.variablesTv5Historicas.Historicos.concat(
          variablesTv5TiempoReal[0].Historicos
        )
        state.variablesTv5Historicas.Limite = variablesTv5TiempoReal[0].Limite
        if (state.variablesTv5Historicas.Historicos.length > 100) {
          state.variablesTv5Historicas.Historicos.shift()
        }
        state.actualizarTv5Grafico = !state.actualizarTv5Grafico
      }
    } else {
      await axios
        .get(`tendencias/${bloqueIdTiempoReal}/historicos`)
        .then(response => {
          state.loadingTv5Grafico = false
          state.variablesTv5Historicas = response.data
          state.actualizarTv5Grafico = !state.actualizarTv5Grafico
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  [SET_ACTUALIZAR_TV6_GRAFICO](state, actualizarTv6Grafico) {
    state.actualizarTv6Grafico = actualizarTv6Grafico
  },
  [SET_VARIABLES_TV6_HISTORICAS](state, variablesTv6Historicas) {
    state.variablesTv6Historicas = variablesTv6Historicas
  },
  async [SOCKET_VARIABLES_TV6_TIEMPO_REAL](state, variablesTv6TiempoReal) {
    state.variablesTv6TiempoReal = variablesTv6TiempoReal
    let bloqueIdHistorico = state.variablesTv6Historicas
      ? parseInt(state.variablesTv6Historicas.Bloque_ID)
      : 0
    let bloqueIdTiempoReal = variablesTv6TiempoReal
      ? parseInt(variablesTv6TiempoReal[0].Bloque_ID)
      : 0

    if (bloqueIdHistorico === bloqueIdTiempoReal) {
      state.loadingTv6Grafico = false
      state.variablesTv6Historicas.Hasta = variablesTv6TiempoReal[0].Hasta
      state.variablesTv6Historicas.Fuera_Limite =
        variablesTv6TiempoReal[0].Fuera_Limite
      if (variablesTv6TiempoReal[0].Historicos.length > 0) {
        state.variablesTv6Historicas.Historicos = state.variablesTv6Historicas.Historicos.concat(
          variablesTv6TiempoReal[0].Historicos
        )
        state.variablesTv6Historicas.Limite = variablesTv6TiempoReal[0].Limite
        if (state.variablesTv6Historicas.Historicos.length > 100) {
          state.variablesTv6Historicas.Historicos.shift()
        }
        state.actualizarTv6Grafico = !state.actualizarTv6Grafico
      }
    } else {
      await axios
        .get(`tendencias/${bloqueIdTiempoReal}/historicos`)
        .then(response => {
          state.loadingTv6Grafico = false
          state.variablesTv6Historicas = response.data
          state.actualizarTv6Grafico = !state.actualizarTv6Grafico
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

export default mutations
