const Product = require('../models/products')

class productService {
    async createAProduct(data) {
        try {
            let result = await Product.create(data)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new productService()