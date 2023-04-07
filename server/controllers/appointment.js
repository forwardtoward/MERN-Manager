const { Appointment } = require("../models/index/index");
const mongoose = require("mongoose");

exports.createAppointment = (req, res) => {
  try {
    const appointmentData = req.body;
    appointmentData.userId = mongoose.Types.ObjectId(req.user._id);

    appointmentData.invitedUser = mongoose.Types.ObjectId(appointmentData.invitedUser);
    console.log(appointmentData);
    const newAppointment = new Appointment(appointmentData);
    newAppointment.save((err, data) => {
      if (err) {
        console.log(err);
        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment created successfully", success: true, data });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getAppointment = (req, res) => {
  try {
    const userId = req.user._id;
    Appointment.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), isDeleted: false } },

      // Lookup user
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "user",
      //     foreignField: "userId",
      //     as: "user",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "bookingtypes",
      //     localField: "bookingType",
      //     foreignField: "_id",
      //     as: "bookingType",
      //   },
      // },
    ])
      .then((data) => {
        res.send({ data, success: true });
      })
      .catch((err) => {
        res.send({ msg: err.message, success: false });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;

    console.log(appointmentData);
    const userId = req.user._id;
    const apptList = await Appointment.find({
      _id: mongoose.Types.ObjectId(appointmentData._id),
      userId: mongoose.Types.ObjectId(userId),
      isDeleted: false,
    });
    oldData = apptList[0];

    console.log("oldData", oldData);
    const { title, start, end, allDay, interval, repeat, invitedUser, remindTo, notification } =
      appointmentData;

    oldData.title = title ? title : oldData.title;
    oldData.start = start ? start : oldData.start;
    oldData.end = end ? end : oldData.end;
    oldData.allDay = allDay ? allDay : oldData.allDay;
    oldData.interval = interval ? interval : oldData.interval;
    oldData.repeat = repeat ? repeat : oldData.repeat;
    oldData.invitedUser = invitedUser ? invitedUser : oldData.invitedUser;
    oldData.remindTo = remindTo ? remindTo : oldData.remindTo;
    oldData.notification = notification ? notification : oldData.notification;

    oldData.save((err, data) => {
      if (err) {
        console.log(err);

        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment updated successfully", success: true, data });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

exports.deleteAppointment = (req, res) => {
  try {
    const appointmentData = req.body;
    appointmentData.user = mongoose.Types.ObjectId(req.user._id);

    const newAppointment = new Appointment(appointmentData);
    newAppointment.save((err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      }
      return res.send({ msg: "Appointment created successfully", success: true, data });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};
