export const SOCKET = 'SOCKET'

const mutations = {
  [SOCKET](state, ws) {
    ws.connect()
    const channel = ws.subscribe('socket')

    channel.on('variables', datos => {
      state.datosSocket = JSON.parse(datos)
    })

    channel.on('cantidad_alarmas_sin_reconocer', data => {
      state.alarmasSinReconocerSocket = data
    })
  }
}

export default mutations
