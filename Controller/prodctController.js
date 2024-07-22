const category = require("../Model/categoryModel")
const product = require("../Model/productModel")

const createProduct = async (req, res) => {
    try {
        const { productName, description, price, stock, categoryId } = req.body
        const imageUrl = req.file.path
        try {
            if (productName && description && price && stock && imageUrl && categoryId) {
                let data = product.create({
                    productName: productName,
                    description: description,
                    price: price,
                    stock: stock,
                    imageUrl: imageUrl,
                    category: categoryId
                })
                res.json({ status: 200, message: "success", data })
            }
            else {
                res.json({ status: 400, message: "not successfully data store database" })
            }
        } catch (error) {
            console.log("Error", e)
        }
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async (productId) => {
    const product = await product.findById(productId).populate('category');
    return product;
}


module.exports = {
    createProduct,
    getProduct
}