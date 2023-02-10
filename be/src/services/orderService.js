const Order = require('../models/orders')
const Cart = require('../models/carts')
const Product = require('../models/products')

class orderService {
    async addOrderService(data) {
        try {
            let cart = await Cart.findOne({ userId: data.userId })
            for (let i = 0; i < cart.items.length; i++) {
                let product = await Product.findById(cart.items[i].product)
                product.quantity = product.quantity - cart.items[i].quantity
                await product.save()
            }
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
    async cancelAOrder(userId, id) {
        try {
            let order = await Order.findOne({ userId, _id: id })
            for (let i = 0; i < order.items.length; i++) {
                let product = await Product.findById(order.items[i].product)
                product.quantity = product.quantity + order.items[i].quantity
                await product.save()
            }
            order.orderStatus = "Cancel"
            await order.save()
            return order
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async updateOrderService(id, data) {
        try {
            let order = await Order.findById(id)
            order.orderStatus = data.orderStatus
            await order.save()
            return order
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new orderService()