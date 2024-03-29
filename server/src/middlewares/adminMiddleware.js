require('dotenv').config()
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const userService = require('../services/userService')

module.exports = {
    async validateRegister(req, res, next) {
        let { email } = req.body
        let err = await userService.findUser(email)
        if (err) {
            return res.status(403).json({
                message: "Account already exists"
            })
        }
        const Schema = Joi.object({
            name: Joi.string()
                .min(3).max(40).required(),
            password: Joi.string()
                .min(6).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            secretAdmin: Joi.string().required()
        })
        const { error } = Schema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error
            })
        }
        if (req.body.secretAdmin !== process.env.SECRET_KEY_ADMIN) {
            return res.status(403).json({
                message: 'Secret code is incorrect'
            })
        }
        next()
    },
    async checkLogin(req, res, next) {
        try {
            let checkToken = req.headers.accessToken
            let result = jwt.verify(checkToken, process.env.JWT_ACCESS_KEY)
            if (result.userType == 'user') {
                return res.status(403).json({
                    message: "You have no authority"
                })
            }
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized."
            })
        }
        next()
    }
}