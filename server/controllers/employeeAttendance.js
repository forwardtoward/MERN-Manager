const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const EmployeeAttendance = require("../models/EmployeeAttendance");
const EmployeeShift = require("../models/EmployeeShift");
const EmployeeContact = require("../models/EmployeeContact");

//create new attendance
const saveAttendance = asyncHandler(async (req, res) => {
  try {
    const { employeeId, shiftId, actualStart } = req.body;
    const { user } = req;
    // Check if already punch in
    const existedEmployee = await EmployeeContact.findById(employeeId);
    existedEmployee.punchState = true;
    await existedEmployee.save();
    const existedShift = await EmployeeShift.findById(shiftId);
    const existedAttendance = await EmployeeAttendance.findOne({ employeeId: employeeId });
    if (existedAttendance) {
      let existedDay = new Date(existedAttendance.actualStart).getDay();
      if (actualDay == existedDay) {
        existedAttendance.actualStart = actualStart;
        await existedAttendance.save();
      } else {
        await EmployeeAttendance.create({
          userId: user._id,
          employeeId: employeeId,
          start: existedShift.start,
          end: existedShift.end,
          shiftName: existedShift.name,
          actualStart: actualStart,
        });
      }
    } else {
      await EmployeeAttendance.create({
        userId: user._id,
        employeeId: employeeId,
        start: existedShift.start,
        end: existedShift.end,
        shiftName: existedShift.name,
        actualStart: actualStart,
      });
    }

    return res.status(201).json({ msg: "Created successfully", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
const deleteAttendance = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    // Check if already punch in
    const existedEmployee = await EmployeeContact.findById(employeeId);
    existedEmployee.punchState = false;
    // await existedEmployee.save();
    await EmployeeAttendance.findOneAndDelete({ employeeId: employeeId });

    return res.status(201).json({ msg: "Created successfully", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
const getAttendance = asyncHandler(async (req, res) => {
  try {
    let allAttendance = await EmployeeAttendance.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id) },
      },
      {
        $lookup: {
          from: "employee-contacts",
          localField: "employeeId",
          foreignField: "_id",
          as: "employeeId",
        },
      },
    ]);
    res.status(200).json(allAttendance);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
module.exports = {
  saveAttendance,
  getAttendance,
  deleteAttendance,
};
