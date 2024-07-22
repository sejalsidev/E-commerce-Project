const category = require("../Model/categoryModel");

const createCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body
        const imageUrl = req.file.path
        if (categoryName && description && imageUrl) {
            let categoryData = await category.create({
                categoryName: categoryName,
                description: description,
                imageUrl: imageUrl
            })
            res.json({ status: 200, message: "success" })
        }
        else {
            res.json("all fields are required")
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createCategory
}