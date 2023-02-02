require('dotenv').config()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const tokenService = require('../services/tokenService')


class adminController {
    async adminRegister(req, res) {
        let { email } = req.body
        let err = await userService.findUser(email)
        if (err !== null) {
            return res.status(200).json({
                EC: -1,
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
        if(error) {
            console.log(error)
            return res.status(200).json({
                EC: -1,
                message: error
            })
        }
        if(req.body.secretAdmin !== process.env.SECRET_KEY_ADMIN) {
            return res.status(200).json({
                EC: -1,
                message: 'Secret code is incorrect'
            })
        }
        const { password } = req.body
        const hash = await bcrypt.hash(password, 10)
        req.body.password = hash
        req.body.userType = 'admin'
        let user = await userService.userRegisterService(req.body)
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Account successfully created",
            data: user
        })
    }
}


module.exports = new adminController()