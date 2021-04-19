const express = require('express')
const app = express()

// Middlewares

// Api Routes
const usersRoutes = require('./routes/users.js')

app.use('/users', usersRoutes)

module.exports = app
