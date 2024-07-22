const express = require('express')
const { DataConnection } = require('./DatabaseConnection')
const userRouter = require('./Router/userRouter')
const categoryRouter = require('./Router/categoryRouter')
const productRouter = require('./Router/productRouter')
const orderRouter = require('./Router/orderRouter')
const app = express()

app.use(express.json())

app.get('', (req, res) => {
    res.send("done")
})

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)
// ------------------------------------------Database-Connection------------------------------------------------

DataConnection().then(() => {
    app.listen(9000, () => {
        console.log('server run')
    })
}).catch(() => {
    console.log("Error", e)
})