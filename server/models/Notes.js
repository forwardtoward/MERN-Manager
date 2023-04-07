const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notes = new schema(
  {
    note: {
      type: String,
      required: true,
    },
    followUpType: {
      type: String,
    },
    response: {
      type: String,
    },
    date: {
      type: String,
      default: new Date(),
    },
    time: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
    clientName: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notes", notes);
