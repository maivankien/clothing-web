const Joi = require('joi')
const fs = require('fs')
const productService = require('../services/productService')


module.exports = {
    async validateProduct(req, res, next) {
        const fileUpload = req.files
        if(!fileUpload) {
            return res.status(400).json({
                message: "No file"
            })
        }
        const filePaths = fileUpload.map((file) => file.path)
        const filePathUrls = filePaths.map(file => file.replace(/\\/g, "/"))
        if (fileUpload.length === 0 || fileUpload.length > 20) {
            return res.status(200).json({
                message: "Invalid number of files",
            })
        }
        for (let i = 0; i < fileUpload.length; i++) {
            if (fileUpload[i].mimetype.split("/")[0] !== "image") {
                filePathUrls.forEach(file => {
                    fs.unlink(file, (err) => {
                        if(err) console.log(err)
                    })
                });
                return res.status(400).json({
                    message: "Invalid file format",
                })
            }
        }
        req.body.finalPaths = filePathUrls
        req.body.price = parseInt(req.body.price)
        req.body.quantity = parseInt(req.body.quantity)
        const Schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            price: Joi.number().integer().min(1000).max(1000000000).required(),
            description: Joi.string().min(3).max(10000).required(),
            quantity: Joi.number().integer().min(0).max(1000000).required(),
            finalPaths: Joi.array().items(Joi.string()).required()
        })

        const { error } = Schema.validate(req.body, { abortEarly: false })
        if (error) {
            filePathUrls.forEach(file => {
                fs.unlink(file, (err) => {
                    if(err) console.log(err)
                })
            });
            return res.status(400).json({
                message: error
            })
        }
        next()
    },
    async findProduct(req, res, next) {
        let product = await productService.getAProductService(req.params.id)
        if(!product) {
            return res.status(404).json({
                message: "No product exists"
            })
        }
        next()
    }
}