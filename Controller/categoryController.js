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
            res.json({ status: 200, message: "success", data: categoryData })
        }
        else {
            res.json("all fields are required")
        }
    } catch (error) {
        console.log(error)
    }
}
const getcategories = async (req, res) => {
    try {
        let categoryData = await category.find()
        if (categoryData) {
            res.json({ status: 200, message: "get category success", data: categoryData })
        }
        else {
            res.json({ status: 400, message: "Not get category" })
        }
    } catch (error) {
        console.log(error)
    }
}
const updateCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body
        console.log(categoryName, description, "categoryName, description")
        const imageUrl = req.file.path
        console.log(req.file, "req.filereq.file")
        console.log(req.files, "req.filereq.file")
        console.log(imageUrl, "imageUrlimageUrl")
        const { id } = req.params

        if (categoryName && description && imageUrl) {

            let dataupdate = await category.findByIdAndUpdate({ _id: id }, {
                categoryName: categoryName,
                description: description,
                imageUrl: imageUrl
            }, { new: true })

            console.log(dataupdate, "dataupdatedataupdate")

            if (dataupdate) {
                res.json({ status: 200, message: "update data succesfully", dataupdate })
            }
            else {
                res.json({ status: 404, message: "Not category Updated" })
            }
        }
        else {
            return res.json({ status: 400, message: "all fields are required" })
        }
    } catch (error) {
        console.log(error.message, "errorerrorerror")
        return res.json({ status: 400, message: "all fields are required" })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    let data = await category.findByIdAndDelete({ _id: id })
    if (data) {
        res.json({ status: 200, message: "delete record successfully" })
    }
    else {
        res.json({ status: 400, message: "Not record deleted" })
    }
}
module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getcategories
}