const mongoose = require('mongoose')


const bandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    logo:{
        type: Object,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Band", bandSchema)