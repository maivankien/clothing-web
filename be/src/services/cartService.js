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
            // Lấy số lượng cũ trong giỏ hàng
            let quantityOld = checkCart.quantity
            // Lấy số lượng mới
            let quantityNew = parseInt(data.quantity)
            let result
            if (data.type == 'update') {
                checkCart.quantity = quantityNew
                // Nếu số lượng cập nhật lớn hơn số lượng cũ
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

// tổng tiền đang là 100k
// có 1 sản phẩm với số lượng 10 giá một cái là 10k
// sửa số lượng sản phẩm lên 15
// tổng tiền sẽ là 150k
// tổng tiền sẽ bằng sô tiền cũ cộng với sô tiền chênh lệch 


module.exports = new cartService()