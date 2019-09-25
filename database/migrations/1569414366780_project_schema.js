'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.text('description')
      table.integer('customer_id').unsigned()
      // The references must match the value defined in the create() function of the table
      // you want to reference.
      table.foreign('customer_id').references('customers.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
