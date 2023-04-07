const AutoLead = require("../models/auto_lead");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.add_auto_lead = async (req, res) => {
    const { displayUrl, userId } = req.body;

    const payload = {
        displayUrl: displayUrl,
        userId: userId
    };

    let AutoLeadObj = new AutoLead(payload);
    AutoLeadObj.save((err, data) => {
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

exports.autolead_url_list = asyncHandler(async (req, res) => {
    try {
        const camp = await AutoLead.find();
        return res.status(200).json(camp);
    } catch (error) {
        return res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
});


exports.update_auto_lead = async (req, res) => {
    try {
        const Obj = req.body;
        const data = await AutoLead.findOneAndUpdate({ _id: req.params.id }, Obj);
        if (data) {
            return res.status(200).json({ success: true, message: `Success` });
        }
        return res.status(404).json({ success: false, message: `data not found` });
    } catch (error) {
        return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
    }
};

exports.del_auto_lead = async (req, res) => {
    try {
        let result = await AutoLead.deleteOne({ _id: req.params.id });
        res.send({ msg: "deleted succesfully", success: true });
    } catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });
    }
};

exports.viewone_auto_lead = asyncHandler(async (req, res) => {


    try {
        const { id } = req.params;
        const getone = await AutoLead.findOne({
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