const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    userType: {
        type: String,
        default: 'user',
    }
}, {
    timestamps: true,
})


const User = mongoose.model('User', userSchema)

module.exports = User