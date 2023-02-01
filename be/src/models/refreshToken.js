const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
})

const refreshToken = mongoose.model('refreshToken', tokenSchema)
module.exports = refreshToken