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
    async findCart(userId) {
        try {
            let result = await Cart.findOne({ userId })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async addProduct(data) {
        try {
            const cart = await Cart.findOne({ userId: data.userId })
            const checkCart = cart.items.find((item => item.product == data.id))
            if (checkCart == undefined) {
                cart.items.push({
                    product: data.id,
                    quantity: parseInt(data.quantity)
                })
            } else {
                checkCart.quantity = checkCart.quantity + parseInt(data.quantity)
            }
            const result = await cart.save()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}


module.exports = new cartService()