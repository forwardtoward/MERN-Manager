const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { FinanceCategory } = require("../models/index/index");

exports.createFinanceCategory = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    payload.userId = mongoose.Types.ObjectId(req.user._id);
    const expenseCategoryData = await FinanceCategory.create(payload);
    return res.status(201).send(expenseCategoryData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getFinanceCategory = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let expenseCategoryData = await FinanceCategory.find({
      userId: mongoose.Types.ObjectId(_id),
    });
    return res.status(200).json(expenseCategoryData);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteFinanceCategoryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await FinanceCategory.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
      userId: mongoose.Types.ObjectId(req.user._id),
    });
    if (category === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Delete category successfully.",
    });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateFinanceCategoryById = asyncHandler(async (req, res) => {
  try {
    const { data } = req.body;
    const { id } = req.params;
    const existedCategory = await FinanceCategory.findById(id);
    if (!existedCategory) throw Error("Category not Found");
    existedCategory.title = data.title;
    existedCategory.labelColor = data.labelColor;
    await existedCategory.save();
    console.log(existedCategory)
    const { _id } = req.user;
    const allFinanceCategoryData = await FinanceCategory.find({
      userId: mongoose.Types.ObjectId(_id),
    });
    console.log(allFinanceCategoryData)
    return res.status(200).json({ message: "Successfully Updated", data:allFinanceCategoryData, success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});