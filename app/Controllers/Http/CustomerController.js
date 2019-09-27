'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use('Validator')
const Customer = use('App/Models/Customer')

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view })
  {
    const customers = await Customer.all();

    response.status(200).json({
      message: 'Here are your customers',
      data: customers
    })
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, session, response, params: { id } })
  {
    const rules = {
      name: 'required',
      email: 'required|email|unique:customers,email'
    }

    const validation = await validate(request.all(), rules)
    
    if (validation.fails()) {
      return validation.messages()
    }
    
    const {name, email} = request.all()

    const customer = await Customer.create({ name, email })

    response.status(201).json({
      message: 'Successfully created a new customer'
    })

    // Another way of doing the above
    // const data = request.only(['name', 'email'])

    // const customer = new Customer()

    // customer.name = name
    // customer.email = email
    
    // await customer.save()

    

    

    
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, params: { id } })
  {
    const customer = await Customer.find(id);

    if (customer) {
      response.status(200).json({
        message: 'Here is the customer you\'re looking for',
        data: customer
      })
    } else {
      response.status(404).json({
        message: 'Can not find a customer with that id',
        id
      })
    }

      
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, params: { id } })
  {
    // const rules = {
    //   name: '',
    //   email: 'email|unique:customers,email'
    // }

    // const validation = await validate(request.all(), rules)
    
    // if (validation.fails()) {
    //   return validation.messages()
    // }
    
    const {name, email} = request.all()
    const customer = await Customer.find(id)

    customer.name = name
    customer.email = email

    await customer.save()

    response.json({
      message: 'Customer record updated'
    })
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, params: { id } })
  {
    const customer = await Customer.find(id)


    response.json({
      message: 'Customer deleted'
    })
  }
}

module.exports = CustomerController
