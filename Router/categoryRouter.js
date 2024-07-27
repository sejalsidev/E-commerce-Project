const express = require('express')
const { createCategory, updateCategory, deleteCategory, getcategories } = require('../Controller/categoryController')
const { upload } = require('../upload')
const router = express.Router()

router.post('/add', upload.single('imageUrl'), createCategory)
router.put('/update/:id', upload.single('imageUrl'), updateCategory)
router.delete('/delete/:id', upload.single('imageUrl'), deleteCategory)
router.get('/get', getcategories)

module.exports = router