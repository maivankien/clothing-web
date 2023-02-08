const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')
const cartMiddleware = require('../middlewares/cartMiddleware')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.post('/refreshToken', userController.requestRefreshToken)
router.post('/logout', userController.userLogout)

router.get('/getProduct/:id', productController.getProduct)
router.get('/getAllProduct', productController.getAllProduct)

router.post('/addCart', userMiddleware.checkLogin, cartMiddleware.addProductToCart, cartController.addProductToCart)
router.get('/getCart', userMiddleware.checkLogin, cartController.getCart)

module.exports = router