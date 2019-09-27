'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class UserController {
    async store ({ request, response, params: { id } })
    {
        const rules = {
            username: 'required|unique:users,username',
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return validation.messages()
        }

        const { username, email, password } = request.all()

        const user = await User.create({ username, email, password })

        response.status(201).json({
            message: 'Successfully created a new user',
            data: user
        })
    }
}

module.exports = UserController
