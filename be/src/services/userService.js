const User = require('../models/users')


class userService {
    async userRegisterService(userData) {
        try {
            let result = await User.create(userData)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findUser(email) {
        try {
            let result = await User.findOne({ email: email })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async userLoginService(userData) {
        try {
            
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new userService()