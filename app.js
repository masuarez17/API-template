const express = require('express')
const morgan = require('morgan')
const app = express()

// Middlewares
app.use(morgan('dev'))
// Api Routes
const usersRoutes = require('./routes/users.js')

app.use('/users', usersRoutes)

// Api route not found
app.use((request, response) => {
    response.status(404).json({
        error: 'Route not found'
    })
})

module.exports = app
