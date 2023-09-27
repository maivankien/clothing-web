const Cart = require('../models/carts')
const User = require('../models/users')
const cartService = require('../services/cartService')
const orderService = require('../services/orderService')

module.exports = {
    async purchase(req, res, next) {
        let user = await User.findById(req.body.userId) 
        if (!user.address || !user.phone) {
            return res.status(400).json({
                message: "You need to update your personal information"
            })
        }
        let cart = await Cart.findOne({ userId: req.body.userId })
        if(!cart.items.length) {
            return res.status(400).json({
                message: "There are no products in the cart"
            })
        }
        next()
    }
}