const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { SubscriptionBought } = require("../models/index");

exports.addSubscriptionForOrgs = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    await SubscriptionBought.updateMany(
      { organizationId: mongoose.Types.ObjectId(req.body.organizationId), status: "waiting" },
      { status: "upgraded" }
    );

    payload = {
      ...payload,
      planId: mongoose.Types.ObjectId(req.body.planId),
      organizationId: mongoose.Types.ObjectId(req.body.organizationId),
    };
    const plan = await SubscriptionBought.create(payload);

    return res.status(201).send(plan);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
