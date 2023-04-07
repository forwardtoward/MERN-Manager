const { CGoal } = require("../models/index/index");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.create_goal = async (req, res) => {
  const { category_goal, goal_name, value, url, desc } = req.body;
  const payload = {
    category_goal: category_goal,
    goal_name: goal_name,
    value: value,
    url: url,
    desc: desc,
  };
  let GoalObj = new CGoal(payload);
  GoalObj.save((err, data) => {
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

exports.get_Goal = asyncHandler(async (req, res) => {
  try {
    const camp = await CGoal.find();
    return res.status(200).json(camp);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

// exports.viewone_Goal = asyncHandler(async (req, res) => {
//   try {
//     const camp = await CGoal.findOne({ _id: req.params.id });
//     console.log("camp", camp)
//     return res.status(200).json(camp);
//   } catch (error) {
//     return res.send({ success: false, message: error.message.replace(/"/g, "") });
//   }
// });


exports.viewone_Goal = asyncHandler(async (req, res) => {


  try {
    const { id } = req.params;
    const getone = await CGoal.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (getone === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json(getone);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }


})

exports.del_goal = async (req, res) => {
  try {
    let result = await CGoal.deleteOne({ _id: req.params.id });
    res.send({ msg: "Goal deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};



exports.update_goal = async (req, res) => {
  try {
    const Obj = req.body;
    const data = await CGoal.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `goal not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};
