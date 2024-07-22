const express = require('express')
const { createCategory } = require('../Controller/categoryController')
const { upload } = require('../upload')
const router = express.Router()

router.post('/add', upload.single('file'), createCategory)

module.exports = router