const mongoose = require("mongoose");

const { Schema } = mongoose;
const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "user",
    },
    products: [
      {
        type: new mongoose.Schema(
          {
            id: {
              type: Schema.Types.ObjectId,
              ref: "product",
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
          { _id: false, versionKey: false, timestamps: false }
        ),
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("product-user-cart", cartSchema);
