const Product = require('../models/products')
const aqp = require('api-query-params')

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
    async getAProductService(id) {
        try {
            let result = await Product.findOne({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getAllProductService(queryString) {
        try {
            const page = queryString.page
            const { filter, limit } = aqp(queryString)
            delete filter.page
            let offset = (page - 1) * limit
            let result = await Product.find(filter).skip(offset).limit(limit).exec()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new productService()