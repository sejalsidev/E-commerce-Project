const express = require('express')
const { createOrder, getOrder, updateOrder, deleteOrder } = require('../Controller/ordercontroller')
const auth = require('../middleware')
const router = express.Router()

router.post('/add', createOrder)
router.get('/get/:orderId', auth, getOrder)
router.put('/update/:id', updateOrder)
router.delete('/delete/:id', deleteOrder)

module.exports = router