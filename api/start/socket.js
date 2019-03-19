'use strict';

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws');
const Redis = use('Redis');
const Alarma = use('App/Models/Alarma');

try {
  Ws.channel('socket', async ({ socket, auth }) => {
    console.log('Se ha unido un usuario ID: %s', socket.id, 'Topic:', socket.topic);

    try {
      // Cuento cantidad de alarmas sin reconocer y emito
      const cantidadAlarmSinReconocer = await Alarma.query()
        .where('reconocida', false)
        .getCount();
      await Redis.set('cantidad_alarmas_sin_reconocer', cantidadAlarmSinReconocer);
      socket.broadcastToAll('cantidad_alarmas_sin_reconocer', cantidadAlarmSinReconocer);

      // Emito ultimo valor del socket
      const datosSocket = await Redis.get('datos_socket');
      socket.broadcastToAll('variables', datosSocket);
    } catch (error) {
      console.log(error);
    }
  });
} catch (error) {
  Ws.close();
}
