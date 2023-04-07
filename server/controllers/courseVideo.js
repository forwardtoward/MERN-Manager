const { CourseVideo,CourseLesson} = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.createVideo = async (req, res) => {
    const userId = req.user._id;
    const lessonId = req.params.lessonId;
    const payload = req.body;
    try {
      payload.userId = userId;
      const newCourseVideo = new CourseVideo(payload);
      const data = await newCourseVideo.save();
      if (data) {
        let updateLesson = await CourseLesson.updateOne(
          {
            _id: mongoose.Types.ObjectId(lessonId),
            userId: mongoose.Types.ObjectId(userId),
          },
          {
            $push: { videoId: data._id },
          }
        );
        if (updateLesson.modifiedCount < 1) {
          return res.send({
            msg: "Video Created but not updated in Lessons",
            success: false,
          });
        }
        return res.send({
          msg: "CourseVideo Created Successfully",
          success: true,
        });
      } else {
        return res.send({
          msg: "CourseVideo not created",
          success: false,
        });
      }
    } catch (err) {
      res.send({ error: err.message.replace(/\"/g, ""), success: false });
    }
  };


exports.deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    try {
        const data = await CourseVideo.findOne({ _id: videoId });
        if (!data) {
            return res.status(404).json({ success: false, message: "No Such Video Found" });
        }
        await CourseVideo.deleteOne({ _id: videoId });
        return res.status(200).json({ success: true });
    } catch (error) {
        res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
});
