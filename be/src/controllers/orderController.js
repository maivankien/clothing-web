const orderService = require('../services/orderService')

class orderController {
    async addOrder(req, res) {
        let order = await orderService.addOrderService(req.body)
        return res.status(200).json({
            EC: 1,
            message: "Order Success",
            data: order
        })
    }
}

module.exports = new orderController()