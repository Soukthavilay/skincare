const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    cart: {
        type: Array,
    },
    sex: {
        type: Boolean,
        default: true
    },
    birthday: {
        type: Date,
    },
    otp: {type: String},          // Temporary OTP field
    otpExpires: {type: Date}, // Temporary OTP field

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)