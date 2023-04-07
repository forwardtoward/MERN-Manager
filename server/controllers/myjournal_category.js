//const myJournalCat = require("../models/myjournal_category");
const googleCloudStorage = require("../Utilities/googleCloudStorage");
const { myJournalCat } = require("../models/index/index");
const asyncHandler = require("express-async-handler");
const { Myjournal } = require("../models/index/index");

exports.create_journal_category = async (req, res) => {

    try {
        const JournalCat = req.body
        const Jobj = new myJournalCat(JournalCat)
        let createJournal = await myJournalCat.create(JournalCat)
        if (createJournal) {
            res.send({
                success: true,
                msg: "journal Category created successfully",
            });

        } else {
            res.send({
                success: false,
                msg: "Error while creating the note",
            });

        }
    } catch (error) {
        return res.send({ error: error.message.replace(/\"/g, ""), success: false });
    }
}


exports.get_journal_Category = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const Jcategory = await myJournalCat.find().sort({ createdAt: 1 })
        return res.status(200).json(Jcategory);
    } catch (error) {
        return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
    }
});



// exports.update = async (req, res) => {
//     const programBody = req.body;
//     // const programId = req.params.proId;
//     try {
//         let url = await googleCloudStorage.upload(req.file);
//         programBody.program_image = url;

//         myJournalCat.updateOne({ _id: req.params.id }, { $set: programBody }).exec(async (err, updateData) => {
//             if (err) {
//                 res.send({ msg: err, success: false });
//             } else {
//                 if (updateData.modifiedCount < 1) {
//                     res.send({
//                         msg: "unable to update program",
//                         success: false,
//                     });
//                 }
//                 res.send({ msg: "programm updated succesfully", success: true });
//             }
//         });
//     }
//     catch (err) {
//         res.send({ msg: err.message.replace(/\"/g, ""), success: false });
//     }
// }

exports.update = async (req, res) => {
    try {
        const Obj = req.body;
        const data = await myJournalCat.findOneAndUpdate({ _id: req.params.id }, Obj);
        if (data) {
            return res.status(200).json({ success: true, message: `Success` });
        }
        return res.status(404).json({ success: false, message: `goal not found` });
    } catch (error) {
        return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
    }
};


exports.del_category = async (req, res) => {
    try {
        let result = await myJournalCat.deleteOne({ _id: req.params.id });
        let ress = await Myjournal.deleteMany({ journal_category: req.params.id });
        res.send({ msg: "deleted succesfully", success: true });
    } catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });
    }
};