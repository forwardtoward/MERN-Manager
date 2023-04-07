const Display_url = require("../models/display_url");
const asyncHandler = require("express-async-handler");

exports.add_display_url = async (req, res) => {
  const { displayUrl } = req.body;

  const payload = {
    displayUrl: displayUrl,
  };

  let DisplayObj = new Display_url(payload);
  DisplayObj.save((err, data) => {
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

exports.display_url_list = asyncHandler(async (req, res) => {
  try {
    const camp = await Display_url.find();
    return res.status(200).json(camp);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});


exports.update_display_url = async (req, res) => {
  try {
    const Obj = req.body;
    const data = await Display_url.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `display url not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

exports.del_display_url = async (req, res) => {
  try {
    let result = await Display_url.deleteOne({ _id: req.params.id });
    res.send({ msg: "display url deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

