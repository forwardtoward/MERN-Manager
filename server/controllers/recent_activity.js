
const { RecentActvity } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");


exports.add_recent_actvty = async (req, res) => {
    try {

        const ActvtyDetail = req.body
        if (req.file) {
            const url = await GoogleCloudStorage.upload(req.file);
            ActvtyDetail.image = url
        }
        //console.log("data", url)
        ActvtyDetail.user = mongoose.Types.ObjectId(req.user._id);

        const Robj = new RecentActvity(ActvtyDetail);
        await Robj.save(async (err, data) => {
            if (err) {
                return res.send({ msg: err.message, success: false });
            } else {
                res.send({
                    msg: "RecentActvity created successfully",
                    success: true,
                    //  data: data
                });
            }
        });

    } catch (error) {
        return res.send({ error: error.message.replace(/\"/g, ""), success: false });
    }
};


// exports.get_RecentActvity = asyncHandler(async (req, res) => {
//     try {
//         const camp = await RecentActvity.find();
//         return res.status(200).json(camp);
//     } catch (error) {
//         return res.send({ success: false, message: error.message.replace(/"/g, "") });
//     }
// });

exports.get_RecentActvity = async (req, res) => {
    const userId = req.params.userId;
    const campaignId = req.params.campaignId;
    try {
        RecentActvity.find({ userId: userId, campaignId: campaignId }).populate('userId')
            .populate('campaignId')

            .then((result) => {
                res.json({
                    data: result,
                    success: true,
                });
            })
            .catch((err) => {
                return res.send(err);
            });
    } catch (err) {
        return res.send({ msg: err.message.replace(/"/g, ""), success: false });
    }
};


exports.viewone_RecentActvity = asyncHandler(async (req, res) => {


    try {
        const { id } = req.params;
        const getone = await RecentActvity.findOne({
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

exports.del_RecentActvity = async (req, res) => {
    try {
        let result = await RecentActvity.deleteOne({ _id: req.params.id });
        res.send({ msg: "RecentActvity deleted succesfully", success: true });
    } catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });
    }
};



exports.update_RecentActvity = async (req, res) => {
    try {
        const Obj = req.body;
        const data = await RecentActvity.findOneAndUpdate({ _id: req.params.id }, Obj);
        if (data) {
            return res.status(200).json({ success: true, message: `Success` });
        }
        return res.status(404).json({ success: false, message: `RecentActvity not found` });
    } catch (error) {
        return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
    }
};
