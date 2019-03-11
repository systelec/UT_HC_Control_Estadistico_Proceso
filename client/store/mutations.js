export const SET_MODO_TIEMPO_REAL = 'SET_MODO_TIEMPO_REAL'
export const SET_APLICAR_FILTRO_TENDENCIA = 'SET_APLICAR_FILTRO_TENDENCIA'
export const SET_TENDENCIA_SELECCIONADA = 'SET_TENDENCIA_SELECCIONADA'

const mutations = {
  [SET_MODO_TIEMPO_REAL](state, modo) {
    state.modoTiempoReal = modo
  },
  [SET_APLICAR_FILTRO_TENDENCIA](state) {
    state.aplicarFiltroTendencia = !state.aplicarFiltroTendencia
  },
  [SET_TENDENCIA_SELECCIONADA](state, tendenciaSeleccionada) {
    state.tendenciaSeleccionada = tendenciaSeleccionada
  }
}

export default mutations
