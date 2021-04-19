const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    console.log('On users route')
    response.status(200).json({
        message: 'ON USERS ROUTES'
    })
});

module.exports = router
