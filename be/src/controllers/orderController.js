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
    async getOrder(req, res) {
        let orders = await orderService.getAllOrderService(req.body)
        return res.status(200).json({
            EC: 1,
            data: orders
        })
    }
    async cancelOrder(req, res) {
        let orders = await orderService.cancelAOrder(req.body.userId, req.params.id)
        return res.status(200).json({
            EC: 1,
            data: orders
        })
    }
}

module.exports = new orderController()