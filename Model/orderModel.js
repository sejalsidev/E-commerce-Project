
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        qty: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true
        }
    }],
    totalprice: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})
const order = mongoose.model('order', orderSchema)
module.exports = order