const Cart = require('../models/carts')
const Product = require('../models/products')
const aqp = require('api-query-params')

class cartService {
    async createCart(userId) {
        try {
            let result = await Cart.create({ userId: userId })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findCart(userId) {
        try {
            let result = await Cart.findOne({ userId })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getCartService(queryString, userId) {
        try {
            const { page, limit } = queryString
            const offset = (page - 1) * limit
            let result = await Cart.findOne({ userId: userId }).populate('items.product').exec()
            if (page == undefined || limit == undefined) {
                return result
            }
            else {
                result.items = result.items.slice(offset, offset + parseInt(limit))
            }
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async addProduct(data) {
        try {
            const cart = await Cart.findOne({ userId: data.userId })
            const checkCart = cart.items.find((item => item.product == data.id))
            if (checkCart == undefined) {
                cart.items.push({
                    product: data.id,
                    quantity: parseInt(data.quantity)
                })
            } else {
                checkCart.quantity = checkCart.quantity + parseInt(data.quantity)
            }
            let product = await Product.findOne({ _id: data.id })
            if (cart.totalPrice == undefined) {
                cart.totalPrice = (product.price) * parseInt(data.quantity)
            }
            else {
                cart.totalPrice += (product.price) * parseInt(data.quantity)
            }
            const result = await cart.save()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async updateCartService(data) {
        try {
            const cart = await Cart.findOne({ userId: data.userId })
            const checkCart = cart.items.find((item => item.product == data.id))
            let product = await Product.findOne({ _id: data.id })
            // L???y s??? l?????ng c?? trong gi??? h??ng
            let quantityOld = checkCart.quantity
            // L???y s??? l?????ng m???i
            let quantityNew = parseInt(data.quantity)
            let result
            if (data.type == 'update') {
                checkCart.quantity = quantityNew
                // N???u s??? l?????ng c???p nh???t l???n h??n s??? l?????ng c??
                if (quantityNew > quantityOld) {
                    cart.totalPrice += (quantityNew - quantityOld) * (product.price)
                }
                else {
                    cart.totalPrice += (quantityNew - quantityOld) * (product.price)
                }
                result = await cart.save()
                return result
            }
            if (data.type == 'delete') {
                cart.totalPrice -= quantityNew * (product.price)
                cart.items = cart.items.filter(item => item.product != data.id)
                result = await cart.save()
                return result
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

// t???ng ti???n ??ang l?? 100k
// c?? 1 s???n ph???m v???i s??? l?????ng 10 gi?? m???t c??i l?? 10k
// s???a s??? l?????ng s???n ph???m l??n 15
// t???ng ti???n s??? l?? 150k
// t???ng ti???n s??? b???ng s?? ti???n c?? c???ng v???i s?? ti???n ch??nh l???ch 


module.exports = new cartService()