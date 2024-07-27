const express = require('express')
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProduct } = require('../Controller/prodctController')
const { upload } = require('../upload')
const router = express.Router()

router.post('/add', upload.single('imageUrl'), createProduct)
router.get('/get/:productId', getProduct)
router.put('/update/:id', upload.single('imageUrl'), updateProduct)
router.delete('/delete/:id', upload.single('imageUrl'), deleteProduct)
router.get('/get', getAllProduct)

module.exports = router