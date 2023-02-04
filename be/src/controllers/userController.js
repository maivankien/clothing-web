require('dotenv').config()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const tokenService = require('../services/tokenService')


const generateAccessToken = (user) => {
    return jwt.sign({
        _id: user._id,
        userType: user.userType
    }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "2m"
    })
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        _id: user._id,
        userType: user.userType
    }, process.env.JWT_REFRESH_KEY, {
        expiresIn: "10d"
    })
}

class userController {
    async userRegister(req, res, next) {
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
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        })
        const { error } = Schema.validate(req.body, { abortEarly: false })
        if (error) {
            console.log(error)
            return res.status(200).json({
                EC: -1,
                message: error
            })
        }
        const { password } = req.body
        const hash = await bcrypt.hash(password, 10)
        req.body.password = hash
        let user = await userService.userRegisterService(req.body)
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Account successfully created",
            data: user
        })
    }
    async userLogin(req, res) {
        let user = await userService.findUser(req.body.email)
        if (user == null) {
            return res.status(200).json({
                EC: -1,
                message: "Account does not exist"
            })
        }
        let err = await bcrypt.compare(req.body.password, user.password)
        if (!err) {
            return res.status(200).json({
                EC: -1,
                message: "Incorrect password"
            })
        }
        let accessToken = generateAccessToken(user)
        let refreshToken = generateRefreshToken(user)
        // Save token in cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        })
        await tokenService.saveRefeshToken(refreshToken)
        user.password = null
        return res.status(200).json({
            EC: 1,
            message: "Successful",
            user: user,
            accessToken: accessToken,
        })
    }
    async requestRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken
        let newAccessToken, newRefreshToken
        if (!refreshToken) {
            return res.status(200).json({
                EC: -1,
                message: "You are not logged in"
            })
        }
        let err = await tokenService.findRefreshToken(refreshToken)
        if (err == null) {
            return res.status(200).json({
                EC: -1,
                message: "You're not authenticated"
            })
        }
        await tokenService.clearTokenService(refreshToken)

        await jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    EC: -1,
                    message: "You're not authenticated"
                })
            }
            newAccessToken = generateAccessToken(user)
            newRefreshToken = generateRefreshToken(user)
            await tokenService.saveRefeshToken(newRefreshToken)
            // Save token in cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
        })
        return res.status(200).json({
            accessToken: newAccessToken,
        })
    }
    async userLogout(req, res) {
        await tokenService.clearTokenService(req.cookies.refreshToken)
        await res.clearCookie("accessToken")
        await res.clearCookie("refreshToken")
        return res.status(200).json({
            EC: 1,
            message: "Successful logout"
        })
    }

}

module.exports = new userController()