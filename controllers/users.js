const database = require('../database')
const Users = database.models.users
const generateReferralCode = require('../utils/referralCode')
const { hashKey } = require('../enviroment')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerUser = async (request, response) => {
    request.query.lastLogin = new Date()

    generateReferralCode()
        .then(result => {
            request.query.referralCode = result
            bcrypt.hash(request.query.password, 10, (error, hash) => {
                if (error) {
                    response.status(500).json({
                        error: error
                    })
                } else {
                    request.query.password = hash

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
                                        let unique = false
                                        error.errors.forEach(error => {
                                            if (error.message === 'users.username must be unique') {
                                                unique = true
                                                response.status(400).json({
                                                    error: 'Username already exist'
                                                })
                                            }
                                        })
                                        if (!unique) {
                                            response.status(400).json(error.errors)
                                        }
                                    })
                            } else {
                                response.status(400).json({
                                    error: 'User already exist'
                                })
                            }
                        })
                        .catch(error => {
                            response.status(500).json(error.errors)
                        })
                }
            })
        })
}

exports.login = (request, response) => {
    Users.findOne({ where: { email: request.query.email } })
        .then(results => {
            if (results === null) {
                response.status(400).json({
                    error: 'Invalid username or password'
                })
            }

            bcrypt.compare(request.query.password, results.password)
                .then(result => {
                    if (result) {
                        Users.update({ lastLogin: new Date() }, { where: {email: request.query.email} })
                        const token = jwt.sign({
                            email: results.email
                        }, hashKey, {
                            expiresIn: '3d'
                        })
                        response.status(200).json({
                            token: token,
                            user: results
                        })
                    } else {
                        response.status(400).json({
                            error: 'Invalid username or password'
                        })
                    }
                })
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
