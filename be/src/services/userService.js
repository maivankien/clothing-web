const User = require('../models/users')
const aqp = require('api-query-params')

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
    async getUser(queryString) {
        const page = queryString.page
        const { filter, limit } = aqp(queryString)
        delete filter.page
        filter.userType = 'user'
        let offset = (page - 1) * limit
        let result = await User.find(filter).skip(offset).limit(limit).exec()
        return result
    }
}

module.exports = new userService()