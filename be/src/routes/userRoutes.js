const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.post('/refreshToken', userController.requestRefreshToken)
router.post('/logout', userController.userLogout)

router.get('/getProduct/:id', productController.getProduct)
router.get('/getAllProduct', productController.getAllProduct)


module.exports = router