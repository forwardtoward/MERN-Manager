const UserTable = require("../models/userTable");
//const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
//const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.usersignup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    password,
    
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUserTable = new UserTable({
    firstName:firstName,
    lastName:lastName,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    
  });

  const findexist = await UserTable.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newUserTable
      .save()
      .then((result) => {
        const token = jwt.sign(
          {
            userId: result._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        );
       // console.log("token",  process.env.TOKEN_SECRET)
        res.header("auth-token", token).status(200).json({
          status: true,
          "auth-token": token,
          msg: "success",
          user: result,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.login = async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      );
      res.header("auth-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        user: user,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
};

exports.adminlogin = async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = jwt.sign(
        {
          adminId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      );
      res.header("ad-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        user: user,
        user_type: "admin",
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "admin Doesnot Exist",
      error: "error",
    });
  }
};

exports.setting = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.userId },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.changepass = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.userId },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.changepassid = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.edituser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allusers = async (req, res) => {
  await User.find()
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.enrollusers = async (req, res) => {
  await User.find({ status: "Enroll" })
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneuser = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.countuser = async (req, res) => {
  await User.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.myprofile = async (req, res) => {
  await User.findOne({ _id: req.userId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteuser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
