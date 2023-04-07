const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");
const { Expense } = require("../models/index/index");

exports.createExpense = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    payload.userId = req.user._id;
    const expenseData = await Expense.create(payload);
    return res.status(201).send(expenseData);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateExpenseById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const expense = await Expense.findOneAndUpdate(
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
    if (expense === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, expense });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteExpenseById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: ObjectId(id),
      userId: ObjectId(req.user._id),
    });
    if (expense === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Delete expense successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getExpenses = async (req, res) => {
  const { _id } = req.user;
  try {
    const expenses = await Expense.aggregate([
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
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getExpense = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    // const expense = await Expense.findOne({
    //   userId: ObjectId(_id),
    //   _id: ObjectId(id),
    // });

    const expense = await Expense.aggregate([
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
    if (expense.length > 0) {
      return res.status(200).send(expense[0]);
    }
    return res.status(404).send({ success: false, message: "Not found" });
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
