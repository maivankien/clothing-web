const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const adminMiddleware = require('../middlewares/adminMiddleware')

const fileService = require('../services/fileService')


router.post('/register', adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminController.adminLogout)
router.post('/refreshToken', adminController.requestRefreshToken)

router.get('/getUser', adminMiddleware.checkLogin, adminController.getAllUser)

router.post('/createProduct', adminMiddleware.checkLogin, fileService.uploadSingleFile.array("img", 10), adminController.postCreateProduct)


module.exports = router