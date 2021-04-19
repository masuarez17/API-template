const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

router.get('/', usersController.getUser)

router.post('/register', usersController.registerUser)

router.delete('/', usersController.deleteUser)

router.put('/', usersController.putUser)



module.exports = router
