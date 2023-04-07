const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { DefaultElement } = require("../models/index");
const { defaultElements } = require("../constants");

exports.getDefaultElements = asyncHandler(async (req, res) => {
  try {
    const elements = await DefaultElement.find({});
    return res.status(201).send(elements);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.insertAllDefault = asyncHandler(async (req, res) => {
  try {
    const constant = defaultElements;
    await DefaultElement.insertMany(constant);
    return res.status(201).send("inserted");
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.insertDefault = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    await DefaultElement.create(payload);
    //add to all permission plans read,write,update,delete = false
    return res.status(201).send("inserted");
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});


