const mongoose = require('mongoose')

const usergoogleSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const userGoogle = mongoose.model("usergoogle", usergoogleSchema)

module.exports = userGoogle