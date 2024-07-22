const mongoose = require('mongoose')
let DataConnection = () => mongoose.connect("mongodb://127.0.0.1:27017/e-commerce").then(() => {
    try {
        console.log("Database connceted")
    } catch (error) {
        console.log("Database not connceted")
    }

}).catch(() => {
    console.log("Error connection to database")
})
module.exports = { DataConnection }