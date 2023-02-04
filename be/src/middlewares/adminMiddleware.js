require('dotenv').config()
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')

module.exports = {
    async checkLogin(req, res, next) {
        try {
            let checkToken = req.cookies.accessToken
            let result = jwt.verify(checkToken, process.env.JWT_ACCESS_KEY)
            if (result.userType == 'user') {
                return res.status(200).json({
                    EC: -1,
                    message: "You have no authority"
                })
            }
            await userService.findUser(result._id)
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
        next()
    }
}