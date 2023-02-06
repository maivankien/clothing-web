const cartService = require('../services/cartService')

class cartController {
    async addProductToCart(req, res) {
        console.log(req.body)
    }
}

module.exports = new cartController()