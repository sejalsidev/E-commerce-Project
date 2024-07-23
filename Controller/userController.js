const user = require("../Model/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const updateUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const { id } = req.params
        if (userName && email && password) {
            let userupdate = await user.findByIdAndUpdate({ _id: id }, {
                userName: userName,
                email: email,
                password: password
            }, { new: true })
            res.json({ status: 200, message: "update data successfully", "data": userupdate })
        }


    } catch (error) {
        console.log(error)
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        let data = await user.findByIdAndDelete({ _id: id })
        if (data) {
            res.json({ status: 200, message: "deleted record successfully", data })
        }
        else {
            res.json({ status: 400, message: "Not delete record " })
        }
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const registerData = await user.findOne({ email })
        if (!registerData) {
            if (userName && email && password) {
                const decrpPwd = await bcrypt.hash(password, 10)
                let data = await user.create({
                    userName: userName,
                    email: email,
                    password: decrpPwd
                })
                return res.json({
                    status: 200,
                    data
                })
            } else {
                return res.json({
                    status: 400,
                    message: "not add data"
                })
            }
        }
        else {
            return res.json({
                status: 400,
                message: "all field are required"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            message: 'internal server error '
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const loginData = await user.findOne({ email })
    console.log(loginData, "userDatauserDatauserDatauserData")
    try {
        if (email && password) {
            if (loginData) {
                const token = jwt.sign({ id: loginData._id, email: loginData.email }, 'your_secret_key', { expiresIn: '1h' });
                console.log(token, "tokentokentokentoken")
                return res.json({
                    status: 200,
                    message: 'login successfully',
                    token
                })
            } else {
                return res.json({
                    status: 400,
                    message: "invalid email and password"
                })
            }
        }
        else {
            return res.json({
                status: 401,
                message: "all field are required"
            })
        }
    } catch (error) {
        console.log(error.message, "errorerrorerrorerrorerror")
        return res.json({
            status: 500,
            message: 'internal server error '
        })
    }

}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    register,
    login
}


