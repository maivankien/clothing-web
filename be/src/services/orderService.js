const Order = require('../models/orders')
const Cart = require('../models/carts')

class orderService {
    async addOrderService(data) {
        try {
            let cart = await Cart.findOne({ userId: data.userId })
            let order = await Order.create({
                userId: cart.userId,
                items: cart.items,
                totalPrice: cart.totalPrice,
                orderStatus: "Wait for confirmation"
            })
            cart.items = []
            await cart.save()
            return order
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new orderService()