const PostFbdata = require("../models/fb_data");
//const resp = require("../helpers/apiResponse");


exports.add_fb_workspace = async (req, res) => {
    const { workspace_name,timezone,img,social_platform } = req.body
    const payload = {
        workspace_name:workspace_name,
        timezone:timezone,
        img:img,
        social_platform:social_platform
    }
    let PostFbdataObj = new PostFbdata(payload)
    PostFbdataObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      })  
    }
    res.send({ status: true, message: "success", data:data });
  });


}
exports.get_workspace_data = async (req, res) => {
    try {
     const PostFbdata = await PostFbdata.find();
     return res.status(200).json(PostFbdata);
   } catch (error) {
     return res.send({ success: false, message: error.message.replace(/"/g, "") });
   }
 };

 


exports.viewone_Campaign = async (req, res) => {
    await PostFbdata.findOne({ _id: req.params.id }).populate("userid").populate("post")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_Campaign = async (req, res) => {
    await PostFbdata.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_Campaign = async (req, res) => {

    await PostFbdata.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



