const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");
const { SubscriptionPlan } = require("../models/index/index");

exports.createPlan = asyncHandler(async (req, res) => {

  try {
    let { userId } = req.user;
    let payload = req.body;

    payload = { ...payload, creatorId: mongoose.Types.ObjectId(userId) };
    const plan = await SubscriptionPlan.create(payload);
    
    return res.status(201).send(plan);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updatePlanById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const plan = await SubscriptionPlan.findOneAndUpdate(
      {
        _id: ObjectId(id),
        isDeleted: false,
      },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
    if (plan === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deletePlanById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findOneAndDelete({
      _id: ObjectId(id),
      isDeleted: false,
    });
    if (plan === null) {
      return res.status(404).json({ success: false, message: "Not found or already deleted" });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted plan successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find(
      {
        isDeleted: false,
      }
      // {
      //   name: 1,
      //   benefits: 1,
      //   price: 1,
      //   validity: 1,
      //   organizationId:1
      // }
    );
    return res.status(200).json(plans);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getPlan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isDefault } = req.query;
  try {
    let plan;
    if (isDefault === "true") {
      plan = await SubscriptionPlan.aggregate([
        {
          $match: { isDefault: true, isDeleted: false },
        }
      ]);
    } else {
      plan = await SubscriptionPlan.aggregate([
        {
          $match: { _id: ObjectId(id), isDeleted: false },
        }
      ]);
    }
    if (plan.length === 0) {
      return res.status(404).send({ success: false, message: "Not found" });
    }
    return res.status(200).json(plan[0]);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

// exports.getPlanByOrg = asyncHandler(async (req, res) => {
//   const { organization_id } = req.headers;
//   try {
//     const plan = await SubscriptionPlan.findOne(
//       { organizationId: ObjectId(organization_id), isDeleted: false },
//       {
//         name: 1,
//         benefits: 1,
//         price: 1,
//         validity: 1,
//       }
//     );
//     if (plan === null) {
//       return res.status(404).send({ success: false, message: "Not found" });
//     }
//     return res.status(200).json(plan);
//   } catch (error) {
//     return res.send({ success: false, message: error.message.replace(/"/g, "") });
//   }
// });
