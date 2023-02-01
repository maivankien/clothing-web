const refreshToken = require('../models/refreshToken')

class tokenService {
    async saveRefeshToken (refreshTokenData) {
        try {
            let result = await refreshToken.create({
                refreshToken: refreshTokenData
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async clearTokenService (refreshTokenData) {
        try {
            let result = await refreshToken.deleteOne({
                refreshToken: refreshTokenData
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new tokenService()