const jwt = require('jsonwebtoken')
const userModel = require('./Model/userModel')

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        console.log(token, "tokentokentokentoken")
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, 'your_secret_key')
            const userData = await userModel.findById({ _id: user.id })
            if (userData) {
                console.log(user)
                req.user = user.id
                next()
            }
            else {
                res.json({
                    status: 401,
                    message: "unathorized user"
                })
            }

        }
        else {
            res.json({
                status: 401,
                message: "unathorized user"
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            status: 401,
            message: "unathorized user"
        })
    }
}
module.exports = auth