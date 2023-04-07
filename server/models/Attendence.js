const mongoose = require("mongoose");

const schema = mongoose.Schema;
const attendenceSchema = schema(
  {
    image: {
      type: String,
    },
    rankImg: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rankName: {
      type: String,
    },
    progression: {
      type: Number,
    },
    className: { type: String, required: true },
    status: {
      type: String,
      default: "no",
      required: true,
    },
    userId: {
      type: String,
      index: true,
    },
    classId: {
      type: String,
    },
    attendedDateTime: {
      type: String,
    },
    rescheduleAttempt: {
      type: String,
      default: 0,
    },
    contactId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendence", attendenceSchema);
