const AdquisicionDatos = require('../app/Jobs/AdquisicionDatos');
const EnvioEmail = require('../app/Utils/EnvioEmail');

cyclicEvent();

async function cyclicEvent() {
  try {
    setTimeout(async () => {
      // await AdquisicionDatos.rapida();
      cyclicEvent();
    }, 60000);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
