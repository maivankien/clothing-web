const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.post('/register', adminController.adminRegister)
router.post('/login', adminController.adminLogin)
router.post('/logout', adminController.adminLogout)
router.post('/refreshToken', adminController.requestRefreshToken)
router.get('/getUser', adminController.getAllUser)

module.exports = router