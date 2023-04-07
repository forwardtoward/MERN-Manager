/* eslint-disable prefer-const */
const mongoose = require("mongoose");
const { MembershipType} = require("../models/index/index");


const getMembershipTypes = async (req, res) => {
  try {
    const { user } = req;
    const memberType = await MembershipType.find({
      userId: user._id,
    });
    return res.status(200).send(memberType);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const addMembershipType=async (req, res) =>{
  const {type, color}=req.body;
  if (!req.user) {
    throw Error("user not Found !");
  }
  const membershiptype = new MembershipType({
    type,
    color,
    userId: req.user.id ? req.user.id : req.user._id,
  });
  membershiptype.save((err, success) => {
    if (err) {
      if (err) {
        throw Error(err);
      }
    } else {
      return res.status(200).json({
        success: "Membership type created successfully.",
      });
    }
  });
}

const deleteMembershipType = async (req, res) => {
  try {
    const { id } = req.params;
    await MembershipType.deleteOne({ _id: id });

    return res.status(200).json({
      success: "Position deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

const putMembershipType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const filter = { _id: id };
    const options = { upsert: true };
    const updatedType = {
      $set: {
        type:type,
      },
    };
    await MembershipType.updateOne(filter, updatedType, options);

    return res.status(200).json({
      success: "Position edited successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

module.exports = {
  getMembershipTypes,
  addMembershipType,
  deleteMembershipType,
  putMembershipType
};
