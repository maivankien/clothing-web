const cartService = require('../services/cartService')

class cartController {
    async addProductToCart(req, res) {
        const cart = await cartService.addProduct(req.body)
        if(cart) {
            return res.status(200).json({
                EC: 1,
                data: cart
            })
        }
        else {
            return res.status(200).json({
                EC: -1,
                message: "Error"
            })
        }
    }
}

module.exports = new cartController()