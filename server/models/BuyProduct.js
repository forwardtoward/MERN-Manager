const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BuyProductSchema = new schema(
  {
    isEMI: {
      type: Boolean,
      required: true,
    },
    due_status: {
      type: String,
      default: "due",
      enum: ["paid", "due", "over_due"],
    },
    refund: {
      type: Array,
    },
    isRefund: {
      type: Boolean,
      default: false,
    },
    buy_client: {
      type: String,
    },
    userId: {
      type: String,
    },
    total_price: {
      type: Number,
      required: true,
    },
    pay_type: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_amount: {
      type: Number,
      required: true,
    },
    pay_time: {
      type: Date,
      required: true,
    },
    transactionId: {},
    subscription_id: {
      type: String,
    },
    cheque_no: {
      type: String,
    },
    emailToken: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buy_Product", BuyProductSchema);
