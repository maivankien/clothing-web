const cartService = require('../services/cartService')
const productService = require('../services/productService')

module.exports = {
    async addProductToCart(req, res, next) {
        const cart = await cartService.findCart(req.body.userId)
        if (cart == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
        const product = await productService.getAProductService(req.body.id)
        if(product == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
        if (parseInt(req.body.quantity) > product.quantity) {
            return res.status(200).json({
                EC: -1,
                message: `You can only buy up to ${product.quantity} products`
            })
        }
        const checkCart = cart.items.find((item => item.product == req.body.id))
        if (checkCart !== undefined) {
            if (checkCart.quantity + parseInt(req.body.quantity) > product.quantity) {
                return res.status(200).json({
                    EC: -1,
                    message: `You can only buy up to ${product.quantity} products`
                })
            }
        }
        next()
    },
    async updateCart(req, res, next) {
        const cart = await cartService.findCart(req.body.userId)
        if (cart == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
        const product = await productService.getAProductService(req.body.id)
        if(product == null) {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
        if (parseInt(req.body.quantity) > product.quantity) {
            return res.status(200).json({
                EC: -1,
                message: `You can only buy up to ${product.quantity} products`
            })
        }
        next()
    }
}