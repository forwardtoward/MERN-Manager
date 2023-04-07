const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const FinanceCategorySchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    labelColor: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    }
  },
  { collection: "finance-category" }
);

module.exports = mongoose.model("finance-category", FinanceCategorySchema);
