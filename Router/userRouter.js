const express = require('express')
const { createUser, updateUser, deleteUser, register, login } = require('../Controller/userController')
const router = express.Router()

router.post('/add', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router