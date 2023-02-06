const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = {
    async checkLogin(req, res, next) {
        try {
            let checkToken = req.cookies.accessToken
            let user = jwt.verify(checkToken, process.env.JWT_ACCESS_KEY)
            req.body.userId = user._id
            next()
        } catch (error) {
            console.log(error)
            if (error.name == "TokenExpiredError") {
                return res.status(200).json({
                    EC: -1,
                    message: "Token has expired"
                })
            }
            return res.status(200).json({
                EC: -1,
                message: "You need to login"
            })
        }
    }
}