const express = require('express')
const { createProduct, getProduct } = require('../Controller/prodctController')
const { upload } = require('../upload')
const router = express.Router()

router.post('/add', upload.single('file'), createProduct)
router.get('/get', getProduct)

module.exports = router