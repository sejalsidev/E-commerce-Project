const category = require("../Model/categoryModel")
const product = require("../Model/productModel")

const createProduct = async (req, res) => {
    console.log(" req.file.path", req.body)
    console.log(" req.file.path", req.file)
    try {
        const { productName, description, price, stock, categoryId } = req.body
        const imageUrl = req.file.path
        try {
            if (productName && description && price && stock && imageUrl && categoryId) {
                let data = await product.create({
                    productName: productName,
                    description: description,
                    price: price,
                    stock: stock,
                    imageUrl: imageUrl,
                    category: categoryId,
                })
                res.json({ status: 200, message: "success", data: data })
            }
            else {
                res.json({ status: 400, message: "all fields are required" })
            }
        } catch (error) {
            console.log("Error", error)
        }
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async (req, res) => {
    const { productId } = req.params
    try {
        let productData = await product.findById(productId).populate('category');
        res.json({ status: 200, data: productData })
        return productData;
    } catch (error) {
        console.log(error)
    }

}

const updateProduct = async (req, res) => {
    try {
        const { productName, description, price, stock, categoryId } = req.body
        const { id } = req.params
        const imageUrl = req.file.path
        if (productName && description && price && stock && categoryId) {
            let updateData = await product.findByIdAndUpdate({ _id: id }, {
                productName: productName,
                description: description,
                price: price,
                stock: stock,
                imageUrl: imageUrl,
                category: categoryId
            }, { new: true })
            if (updateData) {
                res.json({ status: 200, message: "product successfully updated " })
            }
            else {
                res.json({ status: 400, message: "Not product updated " })
            }

        }
        else {
            res.json({ status: 400, message: "all fields are required" })
        }
    } catch (error) {
        return console.log(error)
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    let data = await product.findByIdAndDelete({ _id: id })
    if (data) {
        res.json({ Status: 200, message: "product deleted successfully" })
    }
    else {
        res.json({ status: 400, message: "Not Product delete" })
    }
}

const getAllProduct = async (req, res) => {
    try {
        let productDetail = await product.find()

        if (productDetail) {
            res.json({ status: 200, data: productDetail })
        }
        else {
            res.json({ status: 400, message: "not product data" })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProduct
}