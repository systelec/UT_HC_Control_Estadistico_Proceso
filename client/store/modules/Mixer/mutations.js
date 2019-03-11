export const SET_MIXER = 'SET_MIXER'
export const SET_MIXERS = 'SET_MIXERS'
export const SET_MODAL_AGREGAR_MIXER = 'SET_MODAL_AGREGAR_MIXER'
export const SET_MODAL_EDITAR_MIXER = 'SET_MODAL_EDITAR_MIXER'
export const SET_MODAL_ELIMINAR_MIXER = 'SET_MODAL_ELIMINAR_MIXER'
export const SET_MODAL_RELACIONAR_MIXER_CON_PRODUCTO =
  'SET_MODAL_RELACIONAR_MIXER_CON_PRODUCTO'
export const SET_PAYLOAD_MIXERS = 'SET_PAYLOAD_MIXERS'
export const CLEAR_PAYLOAD_MIXERS = 'CLEAR_PAYLOAD_MIXERS'

const mutations = {
  [SET_MIXER](state, mixer) {
    state.mixer = mixer
  },
  [SET_MIXERS](state, mixers) {
    state.mixers = mixers
  },
  [SET_MODAL_AGREGAR_MIXER](state, modal) {
    state.modalAgregarMixer = modal
  },
  [SET_MODAL_EDITAR_MIXER](state, modal) {
    state.modalEditarMixer = modal
  },
  [SET_MODAL_ELIMINAR_MIXER](state, modal) {
    state.modalEliminarMixer = modal
  },
  [SET_MODAL_RELACIONAR_MIXER_CON_PRODUCTO](state, modal) {
    state.modalRelacionarMixerConProducto = modal
  },
  [SET_PAYLOAD_MIXERS](state, payload) {
    state.payloadMixers = payload
  },
  [CLEAR_PAYLOAD_MIXERS](state, payload) {
    state.payloadMixers = {
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
