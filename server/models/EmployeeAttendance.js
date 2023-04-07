const mongoose = require("mongoose");

const EmployeeAttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee-contacts",
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
    },
    actualStart: {
      type: Date,
    },
    actualEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-attendances", EmployeeAttendanceSchema);
