const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const IncomeSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    clientId: {
      type: ObjectId,
      required: true,
      ref: "client-contact",
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: ObjectId,
      ref: "finance-category",
    },
    note: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    invoiceUrl: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("income", IncomeSchema);
