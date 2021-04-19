const usersModel = require('../models/users')

exports.getUser = (request, response) => {
    response.status(200).json({
        message: 'ON USERS ROUTES'
    })
}

exports.registerUser = (request, response) => {
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
