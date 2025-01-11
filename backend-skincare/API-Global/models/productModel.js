const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    band: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    colors: [
      {
        colorCode: { type: String, required: true },
        colorName: { type: String, required: true },
        sizes: [
          {
            sizeName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
          },
        ],
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Products", productSchema);
