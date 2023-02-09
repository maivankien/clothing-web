const Cart = require('../models/carts')
const cartService = require('../services/cartService')
const orderService = require('../services/orderService')

module.exports = {
    async purchase(req, res, next) {
        let cart = await Cart.findOne({ userId: req.body.userId })
        if(cart.items.length == 0) {
            return res.status(200).json({
                EC: -1,
                message: "There are no products in the cart"
            })
        }
        next()
    }
}