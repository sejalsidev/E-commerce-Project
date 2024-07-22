const express = require('express')
const { createUser } = require('../Controller/userController')
const router = express.Router()

router.post('/add', createUser)

module.exports = router