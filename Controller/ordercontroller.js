const order = require("../Model/orderModel")

const createOrder = async (req, res) => {
    const { totalprice, status, userId, products } = req.body
    try {
        if (totalprice && status && userId && products && products.length > 0) {
            let data = order.create({
                totalprice: totalprice,
                status: status,
                user: userId,
                products: products.map(product => ({ productId: product.productId, qty: product.quantity, price: product.price }))
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
    try {
        const order = await order.findById(orderId).populate('user').populate('products.product');
        res.json({ status: 200, data: order });
    } catch (error) {
        console.log(error);
        res.json({ status: 500, message: "internal server error" });
    }
}
module.exports = {
    createOrder,
    getOrder
}