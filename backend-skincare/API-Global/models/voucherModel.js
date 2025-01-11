const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  applicableCategory: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  conditions: {
    type: String,
    required: true,
  },
  priceConditions:{
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);
