const productService = require('../services/productService')

class productController {
    async postCreateProduct(req, res) {
        let product = await productService.createAProduct(req.body)
        return res.status(200).json({
            EC: 1,
            data: product
        })
    }
    async getProduct(req, res) {
        let product = await productService.getAProductService(req.params.id)
        return res.status(200).json({
            EC: 1,
            data: product
        })
    }
    async getAllProduct(req, res) {
        let products = await productService.getAllProductService(req.query)
        return res.status(200).json({
            EC: 1,
            data: products
        })
    }
    async putUpdateProduct(req, res) {
        let product = await productService.updateAProductService(req.params.id, req.body)
        return res.status(200).json({
            EC: 1,
            data: product
        })
    }
    async deleteAProduct(req, res) {
        let product = await productService.deleteAProductService(req.params.id)
        return res.status(200).json({
            EC: 1,
            data: product
        })
    }
}


module.exports = new productController()