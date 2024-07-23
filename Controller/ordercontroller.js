const order = require("../Model/orderModel")

const createOrder = async (req, res) => {
    const { totalprice, status, userId, productId, qty, price } = req.body
    try {
        if (totalprice && status && userId && productId && qty && price) {
            let data = order.create({
                totalprice: totalprice,
                status: status,
                user: userId,
                productId: productId,
                qty: qty,
                price: price
            });
            res.json({ status: 200, message: "success", data })
        }
        else {
            res.json({ status: 400, message: "all fields are required" })
        }
    } catch (error) {
        console.log(error)
    }
}

const getOrder = async (req, res) => {
    const { orderId } = req.params;
    console.log(orderId, "orderIdorderId")
    try {
        const orderData = await order.findById(orderId).populate('user', 'product')
        console.log(orderData, "orderDataorderData")
        res.json({ status: 200, data: orderData });
    } catch (error) {
        console.log(error);
        res.json({ status: 500, message: "internal server error" });
    }
}

const updateOrder = async (req, res) => {
    const { totalprice, status, userId, productId, qty, price } = req.body
    const { id } = req.params
    try {
        if (totalprice && status && userId && productId && qty && price) {
            let orderData = await order.findByIdAndUpdate({ _id: id }, {
                totalprice: totalprice,
                status: status,
                userId, userId,
                productId, productId,
                qty: qty,
                price: price
            }, { new: true })
            if (orderData) {
                res.json({ status: 200, message: "order successfully updated" })
            }
            else {
                res.json({ status: 400, message: "not order update" })
            }
        }
        else {
            res.json({ status: 400, message: "all fields are required" })
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params
    let data = await order.findByIdAndDelete({ _id: id })
    if (data) {
        res.json({ status: 200, message: "deleted order sucessfully" })
    }
    else {
        res.json({ status: 400, message: "Not delete order" })
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
}