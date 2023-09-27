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
            const sort = {}
            if (queryString.orderBy && queryString.sortedBy) {
                const orderBy = queryString.orderBy.split(',')
                const sortedBy = queryString.sortedBy.split(',')
                for (let i = 0; i < orderBy.length; i++) {
                    sort[orderBy[i]] = sortedBy[i]
                }
            }
            const { filter, limit } = aqp(queryString)
            delete filter.page
            delete filter.orderBy
            delete filter.sortedBy
            let offset = (page - 1) * limit
            if (queryString.name) {
                filter.name = new RegExp(filter.name, 'ui');
            }
            let result = await Product.find(filter).sort(sort).skip(offset).limit(limit).exec()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async updateAProductService(id, data) {
        try {
            let result = await Product.updateOne({ _id: id }, data)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async deleteAProductService(id) {
        try {
            let result = await Product.delete({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new productService()