const { UprrofNotification } = require("../models/index/index");

const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

exports.add_uproof_noti = async (req, res) => {
  const {
    hide_noti_mobile,
    show_on_top,
    position_noti,
    noti_theme,
    delay_first_noti,
    display_each_noti,
    space_each_noti,
  } = req.body;

  const payload = {
    hide_noti_mobile: hide_noti_mobile,
    show_on_top: show_on_top,
    position_noti: position_noti,
    noti_theme: noti_theme,
    delay_first_noti: delay_first_noti,
    display_each_noti: display_each_noti,
    space_each_noti: space_each_noti,
  };
  let NotiObj = new UprrofNotification(payload);
  NotiObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
};

exports.update_uproof_noti = async (req, res) => {
  await UprrofNotification.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.list_uproof_noti = asyncHandler(async (req, res) => {
  try {
    const getdata = await UprrofNotification.find();
    return res.status(200).json(getdata);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.dlt_uproof_noti = asyncHandler(async (req, res) => {
  try {
    let result = await UprrofNotification.deleteOne({ _id: req.params.id });
    res.send({ msg: "Notification deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});
exports.getone_uproof_noti = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getone = await UprrofNotification.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (getone === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json(getone);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
