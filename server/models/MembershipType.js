const mongoose = require("mongoose");

const MembershipType = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    color:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("membershiptype", MembershipType);
