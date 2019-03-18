const AdquisicionDatos = require('../app/Jobs/AdquisicionDatos');
const EnvioEmail = require('../app/Utils/EnvioEmail');
const User = use('App/Models/User');

initialCreate();
cyclicEvent();

async function cyclicEvent() {
  try {
    setTimeout(async () => {
      await AdquisicionDatos.rapida();
      cyclicEvent();
    }, 60000);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

async function initialCreate() {
  let user = await User.query()
    .where('username', 'admin')
    .first();

  if (!user) {
    user = await User.create({
      username: 'admin',
      email: 'admin@unilever.com',
      password: 'admin'
    });
    console.log('Usuario creado con exito!');
  }
  console.log('email:', user.email, 'username:', user.username);
}
