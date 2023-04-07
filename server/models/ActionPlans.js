const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const actinPlansSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      //   required: true,
      ref: "auth",
    },
    title:{
      type:String,
    },
    action: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: String,
    },
    outcome: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("actinPlans", actinPlansSchema);
