const Cart = require('../models/carts')
const User = require('../models/users')
const cartService = require('../services/cartService')
const orderService = require('../services/orderService')

module.exports = {
    async purchase(req, res, next) {
        let user = await User.findById(req.body.userId) 
        if (user.address == undefined || user.phone == undefined) {
            return res.status(200).json({
                EC: -1,
                message: "You need to update your personal information"
            })
        }
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