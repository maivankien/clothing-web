const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const productMiddleware = require('../middlewares/productMiddleware')

const fileService = require('../services/fileService')


router.post('/register', adminMiddleware.validateRegister, adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminMiddleware.checkLogin, adminController.adminLogout)
router.post('/refreshToken', adminController.requestRefreshToken)

router.get('/getUser', adminMiddleware.checkLogin, adminController.getAllUser)

router.post('/createProduct', adminMiddleware.checkLogin, fileService.uploadSingleFile.array("img", 20), productMiddleware.validateProduct, productController.postCreateProduct)
router.get('/getProduct/:id', adminMiddleware.checkLogin, productController.getProduct)
router.get('/getAllProduct', adminMiddleware.checkLogin, productController.getAllProduct)


module.exports = router