const jwt = require('jsonwebtoken')

module.exports = {
    async checkLogin(req, res, next) {
        try {
            let checkToken = req.headers.accessToken
            let user = jwt.verify(checkToken, process.env.JWT_ACCESS_KEY)
            req.body.userId = user._id
            next()
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized."
            })
        }
    }
}