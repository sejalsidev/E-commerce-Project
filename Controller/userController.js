const user = require("../Model/userModel")

const createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (userName && email && password) {
            let userDetail = await user.create({
                userName: userName,
                email: email,
                password: password
            })
            res.json({ status: 200, message: "success", userDetail })
        }
        else {
            res.json("all fields are required")
        }
    }
    catch (error) {
        console.log(error)
    }

}
module.exports = {
    createUser
}