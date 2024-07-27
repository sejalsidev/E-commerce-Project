const mongoose = require('mongoose')
const category = require('./categoryModel')
const productDetail = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    category: {
        type: String,
        ref: 'category',
    },

}, { versionKey: false })
const product = mongoose.model('product', productDetail)
module.exports = product