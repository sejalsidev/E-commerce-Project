const mongoose = require('mongoose')
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
})
const product = mongoose.model('product', productDetail)
module.exports = product