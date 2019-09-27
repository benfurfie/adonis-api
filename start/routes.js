'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const User = use('App/Models/User')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.get('api/v1/customer', 'CustomerController.index');
Route.get('api/v1/customer/:id', 'CustomerController.show');
Route.put('api/v1/customer/:id', 'CustomerController.update');
Route.post('api/v1/customer/store', 'CustomerController.store')