const Joi = require('joi')
const multer = require('multer')
const upload = multer()

module.exports = {
    async validateProduct(req, res, next) {
        // const filePaths = req.files.map((file) => file.path)
        // const filePathUrls = filePaths.map(file => file.replace(/\\/g, "/"))
        // const Shema = Joi.object({
        //     name: Joi.string().min(3).max(50).required(),
        //     price: Joi.integer().min(1000).max(1000000000).required(),
        //     description: Joi.string().min(3).max(10000).required(),
        //     quantity: Joi.integer().min(1).max(1000000).required(),
        //     finalPath: Joi.array()
        // })
        // req.body.price = parseInt(req.body.price)
        // req.body.quantity = parseInt(req.body.quantity)
        // req.body.finalPath = filePathUrls
        // next()
        console.log(req.body)
        console.log(req.files.mimetype.split("/")[0])
    }
}