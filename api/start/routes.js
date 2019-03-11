'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'API SPC Unilver - Systelec S.A' };
});

// Users
Route.get('users', 'UserController.index');
Route.get('users/:id', 'UserController.show');
Route.post('users', 'UserController.store').validator('User/StoreUser');
Route.put('users/:id', 'UserController.update').validator('User/UpdateUser');
Route.delete('users/:id', 'UserController.destroy');

// Tendencias
Route.get('tendencias', 'TendenciaController.index');
Route.get('tendencias/:id', 'TendenciaController.show');
Route.post('tendencias', 'TendenciaController.store').validator('Tendencia/StoreTendencia');
Route.put('tendencias/:id', 'TendenciaController.update').validator('Tendencia/UpdateTendencia');
Route.delete('tendencias/:id', 'TendenciaController.destroy');
Route.get('tendencias/:id/historicos', 'TendenciaController.indexHistoricos');

// Tags
Route.get('tags', 'TagController.index');
Route.get('tags/:id', 'TagController.show');
Route.post('tags', 'TagController.store').validator('Tag/StoreTag');
Route.put('tags/:id', 'TagController.update').validator('Tag/UpdateTag');
Route.delete('tags/:id', 'TagController.destroy');
Route.get('tags/:id/historicos', 'TagController.indexHistoricos');

// Tecnologia
Route.get('tecnologias', 'TecnologiaController.index');
Route.get('tecnologias/:id', 'TecnologiaController.show');
Route.post('tecnologias', 'TecnologiaController.store').validator('Tecnologia/StoreTecnologia');
Route.put('tecnologias/:id', 'TecnologiaController.update').validator(
  'Tecnologia/UpdateTecnologia'
);
Route.delete('tecnologias/:id', 'TecnologiaController.destroy');
Route.get('tecnologias/:id/historicos', 'TecnologiaController.indexHistoricos');
Route.post('tecnologias/:id/mixers', 'TecnologiaController.relationsMixers');

// Mixers
Route.get('mixers', 'MixerController.index');
Route.get('mixers/:id', 'MixerController.show');
Route.post('mixers', 'MixerController.store').validator('Mixer/StoreMixer');
Route.put('mixers/:id', 'MixerController.update').validator('Mixer/UpdateMixer');
Route.delete('mixers/:id', 'MixerController.destroy');
Route.get('mixers/:id/historicos', 'MixerController.indexHistoricos');
Route.post('mixers/:id/productos', 'MixerController.relationsProductos');

// Productos
Route.get('productos', 'ProductoController.index');
Route.get('productos/:id', 'ProductoController.show');
Route.post('productos', 'ProductoController.store').validator('Producto/StoreProducto');
Route.put('productos/:id', 'ProductoController.update').validator('Producto/UpdateProducto');
Route.delete('productos/:id', 'ProductoController.destroy');
Route.get('productos/:id/historicos', 'ProductoController.indexHistoricos');

// Limites
Route.get('limites', 'LimiteController.index');
Route.get('limites/:id', 'LimiteController.show');
Route.post('limites', 'LimiteController.store').validator('Limite/StoreLimite');
Route.put('limites/:id', 'LimiteController.update').validator('Limite/UpdateLimite');
Route.delete('limites/:id', 'LimiteController.destroy');
Route.get('limites/:id/historicos', 'LimiteController.indexHistoricos');

// Historicos
Route.get('historicos', 'HistoricoController.index');

// Tecnologia Mixer
Route.get('tecnologias_mixers', 'TecnologiaMixerController.index');
Route.get('tecnologias_mixers/:id', 'TecnologiaMixerController.show');
Route.post('tecnologias_mixers', 'TecnologiaMixerController.store').validator(
  'TecnologiaMixer/StoreTecnologiaMixer'
);
Route.put('tecnologias_mixers/:id', 'TecnologiaMixerController.update');
Route.delete('tecnologias_mixers/:id', 'TecnologiaMixerController.destroy');

// Mixer Producto
Route.get('mixers_productos', 'MixerProductoController.index');
Route.get('mixers_productos/:id', 'MixerProductoController.show');
Route.post('mixers_productos', 'MixerProductoController.store').validator(
  'MixerProducto/StoreMixerProducto'
);
Route.put('mixers_productos/:id', 'MixerProductoController.update');
Route.delete('mixers_productos/:id', 'MixerProductoController.destroy');

// Destinatario
Route.get('destinatarios', 'DestinatarioController.index');
Route.get('destinatarios/:id', 'DestinatarioController.show');
Route.post('destinatarios', 'DestinatarioController.store').validator(
  'Destinatario/StoreDestinatario'
);
Route.put('destinatarios/:id', 'DestinatarioController.update').validator(
  'Destinatario/UpdateDestinatario'
);
Route.delete('destinatarios/:id', 'DestinatarioController.destroy');
