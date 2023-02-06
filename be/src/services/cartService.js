const Cart = require('../models/carts')

class cartService {
    async createCart(userId) {
        try {
            let result = await Cart.create({ userId: userId })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}


module.exports = new cartService()