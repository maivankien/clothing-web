const cartService = require('../services/cartService')
const productService = require('../services/productService')

module.exports = {
    async addProductToCart(req, res, next) {
        const cart = await cartService.findCart(req.body.userId)
        if (!cart) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        const product = await productService.getAProductService(req.body.id)
        if(!product) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        if (parseInt(req.body.quantity) > product.quantity) {
            return res.status(400).json({
                message: `You can only buy up to ${product.quantity} products`
            })
        }
        const checkCart = cart.items.find((item => item.product == req.body.id))
        if (checkCart) {
            if (checkCart.quantity + parseInt(req.body.quantity) > product.quantity) {
                return res.status(400).json({
                    message: `You can only buy up to ${product.quantity} products`
                })
            }
        }
        next()
    },
    async updateCart(req, res, next) {
        const cart = await cartService.findCart(req.body.userId)
        if (!cart) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        const product = await productService.getAProductService(req.body.id)
        if(!product) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        if (parseInt(req.body.quantity) > product.quantity) {
            return res.status(400).json({
                message: `You can only buy up to ${product.quantity} products`
            })
        }
        next()
    }
}