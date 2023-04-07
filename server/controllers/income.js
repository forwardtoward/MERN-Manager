const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");
const { Income } = require("../models/index/index");

exports.createIncome = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    payload.userId = req.user._id;
    const incomeData = await Income.create(payload);
    return res.status(201).send(incomeData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateIncomeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const income = await Income.findOneAndUpdate(
      {
        _id: ObjectId(id),
        userId: ObjectId(req.user._id),
      },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
    if (income === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, income });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteIncomeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndDelete({
      _id: ObjectId(id),
      userId: ObjectId(req.user._id),
    });
    if (income === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Delete income successfully.",
    });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getIncomes = async (req, res) => {
  const { _id } = req.user;
  try {
    const incomes = await Income.aggregate([
      { $match: { userId: ObjectId(_id) } },
      {
        $lookup: {
          from: "finance-category",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryId",
          pipeline: [
            {
              $project: {
                __v: 0,
                userId: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$categoryId",
      },
      // {
      //   $lookup: {
      //     from: "client-contacts",
      //     localField: "clientId",
      //     foreignField: "_id",
      //     as: "client",
      //   },
      // },
      // {
      //   $unwind: "$client",
      // },
    ]);
    console.log(incomes)
    return res.status(200).json(incomes);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getIncome = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const income = await Income.aggregate([
      { $match: { userId: ObjectId(_id), _id: ObjectId(id) } },
      {
        $lookup: {
          from: "finance-category",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryId",
          pipeline: [
            {
              $project: {
                __v: 0,
                userId: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$categoryId",
      },
      {
        $lookup: {
          from: "client-contacts",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $unwind: "$client",
      },
    ]);
    if (income.length > 0) {
      return res.status(200).send(income[0]);
    }
    return res.status(404).send({ success: false, message: "Not found" });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
