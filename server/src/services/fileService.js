const path = require('path')
const multer = require('multer')

class fileService {
    // create multer object
    uploadFile = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const uploadPath = path.resolve(__dirname, '../public/images/products')
                cb(null, uploadPath)
                req.uploadPath = uploadPath
            },
            filename: function (req, file, cb) {
                const finalName = file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname)
                cb(null, finalName)
                req.finalName = finalName
            }
        })
    })
}

module.exports = new fileService()

