const Joi = require('joi')
const fs = require('fs')
const productService = require('../services/productService')


module.exports = {
    async validateProduct(req, res, next) {
        const fileUpload = req.files
        if(fileUpload == undefined) {
            return res.status(200).json({
                EC: -1,
                message: "No data"
            })
        }
        const filePaths = fileUpload.map((file) => file.path)
        const filePathUrls = filePaths.map(file => file.replace(/\\/g, "/"))
        if (fileUpload.length === 0 || fileUpload.length > 20) {
            return res.status(200).json({
                EC: -1,
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
                return res.status(200).json({
                    EC: -1,
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
            console.log(error)
            filePathUrls.forEach(file => {
                fs.unlink(file, (err) => {
                    if(err) console.log(err)
                })
            });
            return res.status(200).json({
                EC: -1,
                message: error
            })
        }
        next()
    },
    async findProduct(req, res, next) {
        let product = await productService.getAProductService(req.params.id)
        if(product == null) {
            return res.status(200).json({
                EC: -1,
                message: "No product exists"
            })
        }
        next()
    }
}