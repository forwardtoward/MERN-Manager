const mongoose = require("mongoose");
const { Schema } = mongoose;
const classSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    classTitle: {
      type: String,
      required: true,
    },
    programName: [
      {
        value: {
          type: String,
          default: "",
        },
        label: {
          type: String,
          default: "",
        },
        color: {
          type: String,
          default: "",
        },
      },
    ],
    startDate: {
      type: String,
      required: true,
      index: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    classStartTime: {
      type: String,
      required: true,
    },
    classEndTime: {
      type: String,
      required: true,
    },
    classDays: {
      type: Array,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    wholeSeriesEndDate: {
      type: Date,
      required: true,
    },
    wholeSeriesStartDate: {
      type: Date,
      required: true,
    },
    seriesId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
