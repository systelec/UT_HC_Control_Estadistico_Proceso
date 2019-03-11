export const DATOS_SOCKET = 'DATOS_SOCKET'

const mutations = {
  [DATOS_SOCKET](state, ws) {
    ws.connect()
    const channelProductos = ws.subscribe('socket')

    channelProductos.on('variables', datos => {
      state.datosSocket = JSON.parse(datos)

      // if (state.datosAcumuladosSocket.length === 0) {
      //   state.datosAcumuladosSocket = state.datosSocket
      // }

      // state.datosAcumuladosSocket.forEach((item, i) => {
      //   const data = state.datosSocket.find(data => {
      //     if (item.tendencia_id === data.tendencia_id) {
      //       return true
      //     }
      //   })

      //   if (data) {
      //     state.datosAcumuladosSocket[i].hasta = data.hasta
      //     state.datosAcumuladosSocket[i].historicos.push(data.historicos)
      //     state.datosAcumuladosSocket[i].limites.push(data.limites)
      //   }
      // })
    })
  }
}

export default mutations
