const mongoose = require("mongoose");

const courseVideo = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    videoName: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("courseVideo", courseVideo);
