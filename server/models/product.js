const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    product_name: {
      type: String,
      // unique: true,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_url: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_rating: {
      type: Number,
      required: true,
    },
    isfavorite: {
      type: Number,
      default: 0,
    },
    permission: {
      type: String,
      required: true,
    },
    isSignatured: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      index: true,
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
