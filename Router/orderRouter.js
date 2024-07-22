const express = require('express')
const { createOrder, getOrder } = require('../Controller/ordercontroller')
const router = express.Router()

router.post('/add', createOrder)
router.get('/get', getOrder)

module.exports = router