import Ws from '@adonisjs/websocket-client'
import Vue from 'vue'
const ws = Ws('ws://localhost:3333')

Vue.prototype.$ws = ws
