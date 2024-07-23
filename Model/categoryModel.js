const mongoose = require('mongoose')
const categoryDetail = new mongoose.Schema({
    categoryName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    }
}, { versionKey: false })
const category = mongoose.model('category', categoryDetail)
module.exports = category