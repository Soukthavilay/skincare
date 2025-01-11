const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
        default: 0.0
    },
    listOrderItems: {
        type:Array,
        required:true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipping','Paid','Delivered', 'Cancelled','Cancel Requested'],
        default: 'Pending',
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    cancellationReason:{
        type: String,
    },
    paymentMethod:{
        type: String,
        enum: ['PayPal','COD']
    },
    voucherCode: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Orders', orderSchema);