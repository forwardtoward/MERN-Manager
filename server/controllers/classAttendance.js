const { default: mongoose } = require("mongoose");
const moment = require("moment");
const ClassAttendance = require("../models/ClassAttendance");
const Attendance = require("../models/Attendence");
const EmployeeContact = require("../models/EmployeeContact");
const dateRange = require("../helper/dateRange");

/**
 *
 * @desc Create attendance Controller
 * @route POST /api/class/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createClass = async (req, res) => {
  const classData = req.body;
  const classDays = classData.classDays;
  const startDate = classData.startDate;
  const endDate = classData.endDate;
  const classStartTime = classData.classStartTime;
  const classEndTime = classData.classEndTime;
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    seriesId = mongoose.Types.ObjectId();
    if (dates.length > 1) {
      for (let index in dates) {
        let date = dates[index];
        let dayName = moment(new Date(dates[index])).format("dddd");
        if (classDays.includes(dayName)) {
          //let classStartDate = moment(startDate).date(moment(date).date());
          // let classEndDate = moment(endDate).date(moment(date).date());
          let NewClass = {
            ...classData,
            seriesId,
            startDate: date,
            endDate: date,
            classStartTime,
            classEndTime,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
          };
          allAttendance.push(NewClass);
        }
      }
    } else if (dates.length === 1) {
      let NewClass = {
        ...classData,
        startDate: startDate,
        endDate: endDate,
        classStartTime,
        classEndTime,
        wholeSeriesEndDate: endDate,
        wholeSeriesStartDate: startDate,
      };
      allAttendance.push(NewClass);
    }
    await ClassAttendance.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 *
 * @desc Update attendance Controller
 * @route POST /api/class/update
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateClass = async (req, res) => {
  const id = req.body?._id;
  ClassAttendance.findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Class successfully updated",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        errors: { common: { msg: error.message } },
      });
    });
};

/**
 *
 * @desc Update updateWholeSeries attendance Controller
 * @route POST /api/class/updateWholeSeries
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.updateWholeSeries = async (req, res) => {
  try {
    const seriesId = req.body?.seriesId;
    const isDateTimeChange = req.body?.isDateTimeChange;
    const classId = req.body?.classId;
    const type = req.body?.type;
    if (isDateTimeChange) {
      // if whole series start or end date is changed then need to delete and reinsert classes
      if (type === "single") {
        await ClassAttendance.findByIdAndDelete(classId)
          .then((resp) => {
            if (resp.deletedCount < 1) {
              res.status(403).json({
                msg: "Class Id not found!",
                success: false,
              });
            } else {
              reInsertWholeClassSeries(req.body, seriesId, res);
            }
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              errors: { common: { msg: err.message } },
            });
          });
      } else {
        await ClassAttendance.deleteMany({
          $and: [{ seriesId: seriesId }],
        })
          .then((resp) => {
            if (resp.deletedCount < 1) {
              res.status(403).json({
                msg: "series Id not found!",
                success: false,
              });
            } else {
              reInsertWholeClassSeries(req.body, seriesId, res);
            }
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              errors: { common: { msg: err.message } },
            });
          });
      }
    } else {
      if (type === "single") {
        await ClassAttendance.findByIdAndUpdate(classId, {
          programName: req.body.programName,
          classTitle: req.body.classTitle,
          classStartTime: req.body.classStartTime,
          classEndTime: req.body.classEndTime,
        }).exec((err, updateResp) => {
          if (err) {
            res.send({ msg: "Classes not updated!", success: false });
          } else {
            res.send({
              msg: "This class schedule has been updated Successfully",
              success: true,
            });
          }
        });
      } else if (type === "all") {
        ClassAttendance.updateMany(
          { seriesId: seriesId },
          {
            programName: req.body.programName,
            classTitle: req.body.classTitle,
            classStartTime: req.body.classStartTime,
            classEndTime: req.body.classEndTime,
          }
        ).exec((err, updateResp) => {
          if (err) {
            res.send({ msg: "Classes not updated!", success: false });
          } else {
            res.send({
              msg: "All class schedule has been updated Successfully",
              success: true,
            });
          }
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

reInsertWholeClassSeries = async (classData, seriesId, res) => {
  const classDays = classData.classDays;
  const startDate = classData.wholeSeriesStartDate;
  const endDate = classData.wholeSeriesEndDate;
  const classStartTime = classData.classStartTime;
  const classEndTime = classData.classEndTime;
  try {
    const dates = dateRange(startDate, endDate);
    let allAttendance = [];
    if (dates.length > 1) {
      for (let index in dates) {
        let date = dates[index];
        let dayName = moment(new Date(dates[index])).format("dddd");
        if (classDays.includes(dayName)) {
          //let classStartDate = moment(startDate).date(moment(date).date());
          // let classEndDate = moment(endDate).date(moment(date).date());
          let NewClass = {
            ...classData,
            seriesId,
            startDate: date,
            endDate: date,
            classStartTime,
            classEndTime,
            wholeSeriesEndDate: endDate,
            wholeSeriesStartDate: startDate,
          };
          allAttendance.push(NewClass);
        }
      }
    } else if (dates.length === 1) {
      let NewClass = {
        ...classData,
        startDate: endDate,
        endDate: startDate,
        classStartTime,
        classEndTime,
        wholeSeriesEndDate: endDate,
        wholeSeriesStartDate: startDate,
      };
      allAttendance.push(NewClass);
    }
    await ClassAttendance.insertMany(allAttendance)
      .then((result) => {
        res.send({
          msg: "Class scheduled succefully!",
          data: result,
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get all classes of user
 * @route GET api/class/all/:userId
 * @returns
 */
exports.getClasses = async (req, res) => {
  const { userId } = req.params;
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const startMonth = moment(new Date()).startOf("month");
  const endMonth = moment(new Date()).endOf("month");
  const startYear = moment(new Date()).startOf("year");
  const endYear = moment(new Date()).endOf("year");
  try {
    const classes = await ClassAttendance.find({ userId });
    const dayClasses = await ClassAttendance.find({
      userId,
      startDate: { $eq: currentDate },
    });
    const monthClasses = await ClassAttendance.find({
      userId,
      wholeSeriesStartDate: { $gte: startMonth, $lte: endMonth },
    });
    const yearClasses = await ClassAttendance.find({
      userId,
      wholeSeriesStartDate: { $gte: startYear, $lte: endYear },
    });
    return res.status(200).json({
      success: true,
      data: {
        classes,
        dayClasses,
        monthClasses,
        yearClasses,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get information of a class
 * @route GET api/class/info/:classId
 * @return
 */
exports.getClassInfo = async (req, res) => {
  const { classId } = req.params;
  try {
    const classEvent = await ClassAttendance.findById(classId);
    if (!classEvent) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(classEvent);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Class by class Id
 * @route GET api/class/info/:classId
 * @return
 */
exports.deleteClass = async (req, res) => {
  const { classId, type } = req.params;
  try {
    if (type === "single") {
      await ClassAttendance.findByIdAndDelete(classId);
      return res.status(200).json({ success: true, msg: "Successfully deleted" });
    }

    if (type === "all") {
      ClassAttendance.deleteMany({
        $and: [{ seriesId: classId }],
      })
        .then((resp) => {
          if (resp.deletedCount < 1) {
            res.status(403).json({
              msg: "series Id not found!",
              success: false,
            });
          } else {
            return res.status(200).json({ success: true, msg: "Successfully deleted" });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            errors: { common: { msg: err.message } },
          });
        });
    }
  } catch (err) {
    return res.status(404).json({ success: false, errors: { common: { msg: err.message } } });
  }
};

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.markAttendance = async (req, res) => {
  const { classId, bookingId, userId, status, attendedDateTime } = req.body;
  try {
    //   const existedAttendance = await Attendance.findOne({ classId: classId, userId: userId });
    //   if (existedAttendance) {
    //     let curDate = new Date(existedAttendance.attendedDateTime);
    //     existedAttendance.status = status;
    //     await existedAttendance.save().then((response) => {
    //       if (response) {
    //         res.send({
    //           msg: "Attendance marked successfully",
    //           success: true,
    //         });
    //       }
    //     });
    //   } else {
    //     const student = await EmployeeContact.findById(userId);
    //     const classInfo = await ClassAttendance.findById(classId);

    //     await Attendance.create({
    //       fullName: student.fullName,
    //       email: student.email,
    //       userId: userId,
    //       className: classInfo.classTitle,
    //       classId: classId,
    //       attendedDateTime: attendedDateTime,
    //       status: status,
    //     }).then((response) => {
    //       if (response) {
    //         res.send({
    //           msg: "Attendance marked successfully",
    //           success: true,
    //         });
    //       }
    //     });
    //   }
    await Attendance.findByIdAndUpdate(bookingId, {
      status: req.body.status,
      attendedDateTime: req.body.attendedDateTime,
    }).exec((err) => {
      if (err) {
        res.send({ msg: "Attendance not marked!", success: false });
      } else {
        res.send({
          msg: "Attendance marked successfully",
          success: true,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc add class booking
 * @route GET api/attendance/bookClass
 * @return
 */
exports.bookClass = async (req, res) => {
  const { classId, contactId } = req.body;
  const newBooking = new Attendance({ ...req.body });
  try {
    const attendanceData = await Attendance.findOne({
      classId: classId,
      contactId: contactId,
    });

    if (attendanceData) {
      return res.status(500).json({
        errors: { common: { msg: "Class booked already for student" } },
      });
    } else {
      newBooking
        .save()
        .then((data) => {
          return res.status(200).json({ success: true, msg: "Class successfully booked" });
        })
        .catch((error) => {
          return res.status(500).json({
            errors: { common: { msg: error.message } },
          });
        });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Create a Class mark-attendance by class Id
 * @route GET api/class/mark-attendance
 * @return
 */
exports.getAttendance = async (req, res) => {
  const { classId } = req.params;
  try {
    const attendees = await Attendance.find({ classId, status: "yes" });
    return res.status(200).json({
      success: true,
      data: attendees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc get Booking by class id
 * @route GET api/attendance/getClassBooking
 * @return
 */
exports.getClassBooking = async (req, res) => {
  const { classId } = req.params;
  try {
    const classBookings = await Attendance.find({ classId });
    return res.status(200).json({
      success: true,
      data: classBookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Attendance by attendance Id
 * @route GET api/attendance/delete-attendance/:attendanceId
 * @return
 */
exports.deleteAttendance = async (req, res) => {
  const { attendanceId } = req.params;

  try {
    await Attendance.findByIdAndDelete(attendanceId)
      .then(() => {
        return res.status(200).json({ success: true, msg: "Successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
      });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
};

/**
 * @desc Delete a Attendance by attendance Id
 * @route GET api/attendance/delete-booking/:bookingId
 * @return
 */
exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    await Attendance.findByIdAndDelete(bookingId)
      .then(() => {
        return res.status(200).json({ success: true, msg: "Successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
      });
  } catch (err) {
    return res.status(500).json({ success: false, errors: { common: { msg: err.message } } });
  }
};

exports.oneTimeSchedule = async (req, res) => {
  const payload = req.body;
  const classId = payload?._id;
  const bookingId = payload?.bookingId;
  if (payload.type === "existingSchedule") {
    //update class Id attendance table with bookingId
    await Attendance.findByIdAndUpdate(
      bookingId,
      { $set: { classId: classId } },
      { $inc: { rescheduleAttempt: 1 } }
    );
    return res.status(200).json({ success: true, msg: "Class Reschedule successfully" });
  } else {
    // create new class and update to booking
    //update class Id attendance table with bookingId
    await ClassAttendance.create(payload)
      .then(async (classData) => {
        console.log(classData);
        const classId = classData?._id;
        await Attendance.findByIdAndUpdate(
          bookingId,
          { $set: { classId: classId } },
          { $inc: { rescheduleAttempt: 1 } }
        );
        return res.status(200).json({ success: true, msg: "Class Reschedule successfully" });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: { common: { msg: error.message } },
        });
      });
  }
};

exports.ongoingTimeSchedule = async (req, res) => {
  const payload = req.body;
  const seriesId = payload?.seriesId;
  let bookingRow = payload?.bookingRow;
  delete bookingRow._id;
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  try {
    // fetch all ongoing classes with series Id
    const classes = await ClassAttendance.find({
      seriesId: seriesId,
      startDate: { $gte: currentDate }, // get ongoing classes
    });

    let allBooking = [];
    if (classes.length > 0) {
      classes.map((classRow) => {
        // assign class Id for all bookings
        let NewBooking = { ...bookingRow, classId: classRow?._id };
        allBooking.push(NewBooking);
        // create booking for all classes
        return true;
      });
    }

    if (allBooking.length > 0) {
      // insert  booking for all classes
      await Attendance.insertMany(allBooking)
        .then((result) => {
          res.send({
            msg: "Class Reschedule successfully!",
            data: result,
            success: true,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            success: false,
            errors: { common: { msg: error.message } },
          });
        });
    } else {
      return res.status(500).json({
        errors: { common: { msg: "Ongoing classes not found!" } },
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: { common: { msg: err.message } },
    });
  }
};
