const Compose = require("../models/compose");
//const { Compose } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const resp = require("../helpers/apiResponse")
var moment = require("moment");
const cron = require('node-cron');


exports.add_compose = async (req, res) => {
  try {

    const ComposeDetail = req.body
    if (req.file) {
      const url = await GoogleCloudStorage.upload(req.file);
      ComposeDetail.media_img = url
    }
    //console.log("data", url)
    const Jobj = new Compose(ComposeDetail);
    await Jobj.save(async (err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      } else {
        res.send({
          msg: "Compose created successfully",
          success: true,
          //  data: data
        });
      }
    });

  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};
// exports.get_compose = asyncHandler(async (req, res) => {

//   let today = new Date();
//   let dd = String(today.getDate()).padStart(2, '0');
//   let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//   let yyyy = today.getFullYear();
//   let cdate = yyyy + '-' + mm + '-' + dd;
//   let hour = today.getHours();
//   hour = hour < 10 ? '0' + hour : hour;
//   let ctime = hour + ':' + today.getMinutes();
//   //today='2023-02-23';
//   console.log(ctime);
//   let datapost = await Compose.find()
//     .sort({ sortorder: 1 })
//     .then((data) => {
//       let time = '';
//       let date = '';
//       for (i = 0; i < data.length; i++) {
//         date = data[i].date;
//         time = data[i].time;
//         if (cdate == date && time == ctime) {
//           //   console.log("datai", data[i])
//           let getdata = data[i]

//           let datsa = Compose.updateMany(
//             { status: 0 },
//             { $set: { status: 1 } },
//             { new: true },
//             function (err, result) {
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log(result);
//               }
//             }
//           );

//         }

//       }

//     })
//   let getdata = await Compose.find({ status: 1 })

//   res.send(getdata)

//   //.catch((error) => resp.errorr(res, error));

// })
exports.get_compose = asyncHandler(async (req, res) => {
  try {
    //  const { id: courseId, assignmentId } = req.params;
    const data = await Compose.find();
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.viewone_compose = asyncHandler(async (req, res) => {
  try {
    //  const { id: courseId, assignmentId } = req.params;
    const data = await Compose.findOne({ _id: req.params.id });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.del_compose = async (req, res) => {
  try {
    let result = await Compose.deleteOne({ _id: req.params.id });
    res.send({ msg: "Comment deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.edit_media = async (req, res) => {
  const { media_img } = req.body;

  data = {};

  if (req.files) {
    if (req.files.media_img) {
      alluploads = [];
      for (let i = 0; i < req.files.media_img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.media_img[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.media_img[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.media_img = alluploads;
    }
  }
  await Compose.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.update_compose = async (req, res) => {
  try {
    const Obj = req.body;
    const data = await Compose.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `compose not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};



// exports.get_compose_schdule = asyncHandler(async (req, res) => {
//   // Get current date and time
//   let today = new Date();
//   let dd = String(today.getDate()).padStart(2, '0');
//   let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//   let yyyy = today.getFullYear();
//   let cdate = yyyy + '-' + mm + '-' + dd;
//   let hour = today.getHours();
//   hour = hour < 10 ? '0' + hour : hour;
//   let ctime = hour + ':' + today.getMinutes();
//   console.log(ctime);

//   // Run the cron job every minute
//   cron.schedule('* * * * *', async () => {
//     let datapost = await Compose.find().sort({ sortorder: 1 });
//     let time = '';
//     let date = '';
//     for (i = 0; i < datapost.length; i++) {
//       date = datapost[i].date;
//       time = datapost[i].time;
//       if (cdate == date && time == ctime) {
//         let getdata = datapost[i];
//         let datsa = Compose.updateMany(
//           { status: 0 },
//           { $set: { status: 1 } },
//           { new: true },
//           function (err, result) {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(result);
//             }
//           }
//         );
//       }
//     }

//     let getdata = await Compose.find({ status: 1 });
//     console.log(getdata)
//     res.send(getdata);
//   });
// });