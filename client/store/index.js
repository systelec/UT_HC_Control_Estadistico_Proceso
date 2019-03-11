import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import Tecnologia from './modules/Tecnologia/module'
import Producto from './modules/Producto/module'
import Mixer from './modules/Mixer/module'
import Alarma from './modules/Alarma/module'
import Historico from './modules/Historico/module'
import Limite from './modules/Limite/module'
import Tendencia from './modules/Tendencia/module'
import Tag from './modules/Tag/module'
import Destinatario from './modules/Destinatario/module'
import User from './modules/User/module'
import Socket from './modules/Socket/module'
import usuario from './modules/usuario/module'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      Tecnologia,
      Producto,
      Mixer,
      Alarma,
      Historico,
      Limite,
      Tendencia,
      Tag,
      Destinatario,
      User,
      usuario,
      Socket
    }
  })
}

export default createStore
