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
            cart.totalPrice = 0
            await cart.save()
            return order
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getAllOrderService(data) {
        try {
            let orders = await Order.find({ userId: data.userId }) // populate('items.product')
            return orders
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new orderService()