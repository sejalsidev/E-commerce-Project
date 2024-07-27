const express = require('express')
const { createUser, updateUser, deleteUser, register, login, getUser } = require('../Controller/userController')
const auth = require('../middleware')
const router = express.Router()

router.post('/add', createUser)
router.get('/get', auth, getUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router