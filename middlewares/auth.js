const { hashKey } = require('../enviroment')
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    try {
        const decodedData = jwt.verify(request.query.token, hashKey,)
        request.decodedData = decodedData
        next()
    } catch (error) {
        return response.status(400).json({
            error: 'Auth failed'
        })
    }
}
