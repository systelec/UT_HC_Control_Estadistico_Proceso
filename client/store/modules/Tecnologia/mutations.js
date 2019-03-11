export const SET_TECNOLOGIA = 'SET_TECNOLOGIA'
export const SET_TECNOLOGIAS = 'SET_TECNOLOGIAS'
export const SET_MODAL_AGREGAR_TECNOLOGIA = 'SET_MODAL_AGREGAR_TECNOLOGIA'
export const SET_MODAL_EDITAR_TECNOLOGIA = 'SET_MODAL_EDITAR_TECNOLOGIA'
export const SET_MODAL_ELIMINAR_TECNOLOGIA = 'SET_MODAL_ELIMINAR_TECNOLOGIA'
export const SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER =
  'SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER'
export const SET_PAYLOAD_TECNOLOGIAS = 'SET_PAYLOAD_TECNOLOGIAS'
export const CLEAR_PAYLOAD_TECNOLOGIAS = 'CLEAR_PAYLOAD_TECNOLOGIAS'

const mutations = {
  [SET_TECNOLOGIA](state, tecnologia) {
    state.tecnologia = tecnologia
  },
  [SET_TECNOLOGIAS](state, tecnologias) {
    state.tecnologias = tecnologias
  },
  [SET_MODAL_AGREGAR_TECNOLOGIA](state, modal) {
    state.modalAgregarTecnologia = modal
  },
  [SET_MODAL_EDITAR_TECNOLOGIA](state, modal) {
    state.modalEditarTecnologia = modal
  },
  [SET_MODAL_ELIMINAR_TECNOLOGIA](state, modal) {
    state.modalEliminarTecnologia = modal
  },
  [SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER](state, modal) {
    state.modalRelacionarTecnologiaConMixer = modal
  },
  [SET_PAYLOAD_TECNOLOGIAS](state, payload) {
    state.payloadTecnologias = payload
  },
  [CLEAR_PAYLOAD_TECNOLOGIAS](state, payload) {
    state.payloadTecnologias = {
      params: {
        id: null,
        sortBy: 'nombre',
        descending: 'nombre' ? 'DESC' : 'ASC',
        page: 1,
        perPage: 100,
        search: '',
        searchField: 'nombre'
      }
    }
  }
}

export default mutations
