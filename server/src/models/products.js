const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    finalPaths: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

productSchema.plugin(mongoose_delete, { overrideMethods: 'all' })

const Product = mongoose.model('Product', productSchema)

module.exports = Product