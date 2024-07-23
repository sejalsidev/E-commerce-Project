
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    totalprice: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    }
}, { versionKey: false })
const order = mongoose.model('order', orderSchema)
module.exports = order