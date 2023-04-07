const uproofLabel = require("../models/uproof_label");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const resp = require("../helpers/apiResponse");

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });


exports.add_label = async (req, res) => {
    const { time, date, add_label, workspace, timezone, approvel } = req.body
    const payload = {
        time: time,
        date: date,
        add_label: add_label,
        workspace: workspace,
        timezone: timezone,
        approvel: approvel
    }
    let labelObj = new Campaign(payload);
    labelObj.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "error",
          error: err
        });
      }
      res.send({ status: true, message: "success", data: data });
    });
}

exports.get_label = async (req, res) => {
   
    try {
        const camp = await Label.find();
        return res.status(200).json(camp);
      } catch (error) {
        return res.send({ success: false, message: error.message.replace(/"/g, "") });
      }
    };


exports.viewone_label = async (req, res) => {
    await Label.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_label = async (req, res) => {
    await Label.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_label = async (req, res) => {
    
    await Label.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



 