const database = require('../database')
const Users = database.models.users

exports.registerUser = (request, response) => {
    console.log(request)
    request.query.last_login = new Date()
    Users.findByPk(request.query.email)
        .then(result => {
            if (result === null) {
                Users.create(request.query)
                    .then(() => {
                        response.status(201).json({
                            message: 'User created successfully'
                        })
                    })
                    .catch(error => {
                        response.status(500).json(error.errors)
                    })
            } else {
                response.status(403).json({
                    error: 'User already exist'
                })
            }
        })
        .catch(error => {
            response.status(500).json(error.errors)
        })
}

exports.getUser = (request, response) => {
    response.status(200).json({
        message: 'ON USERS ROUTES'
    })
}

exports.deleteUser = (request, response) => {
    response.status(200).json({
        message: 'ON USERS ROUTES DELETE'
    })
}

exports.putUser = (request, response) => {
    response.status(200).json({
        message: 'ON USERS ROUTES PUT'
    })
}
