//const Myjournal = require("../models/myjournal");
const { Myjournal } = require("../models/index/index");
const myJournalCat = require("../models/MyjournalCategory");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require('moment');

const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const cron = require('node-cron');



exports.add_MyJournal = async (req, res) => {
    try {
        const JournalDetail = req.body;
        if (req.file) {
            const url = await GoogleCloudStorage.upload(req.file);
            JournalDetail.jrnl_img = url;
        }
        const Jobj = new Myjournal(JournalDetail);
        let createJournal = await Jobj.save();
        //
        if (createJournal) {
            const getcategory = await myJournalCat.findOne({ _id: req.body.journal_category });
            const getc = getcategory.count;
            console.log("getc", getc)
            const getdata = await myJournalCat.findOneAndUpdate(
                { _id: req.body.journal_category },
                { $set: { count: getcategory?.count + 1 } },
                { new: true }
            );
            res.send({
                success: true,
                msg: "Journal created successfully",
            });
        }
        else {
            res.send({
                success: false,
                msg: "Error while creating the note",
            });
        }

    }
    catch (error) {
        return res.send({ error: error.message.replace(/\"/g, ""), success: false });
    }
};

exports.myJournal_list = async (req, res) => {

    try {
        //  const { id: courseId, assignmentId } = req.params;
        const data = await Myjournal.find();
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ success: false, message: "Something went wrong!" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
    };
};
exports.getone_myJournal = asyncHandler(async (req, res) => {


    try {
        const { id } = req.params;
        const getone = await Myjournal.findOne({
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


exports.dltMyJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const getone = await Myjournal.findOne({
            _id: mongoose.Types.ObjectId(id),
        }).populate("journal_category")
        //const getcategory = await Myjournal.findOne({ _id: req.params.id })
        // console.log("getcategory", getone)

        const getc = getone.journal_category
        //  console.log("getc", getc)
        const getcnt = getc.count
        //   console.log("getc", getcnt)
        const getdata = await myJournalCat.findOneAndUpdate(
            { _id: getc },
            { $set: { count: getcnt - 1 } },
            { new: true }
        );

        let result = await Myjournal.deleteOne({ _id: req.params.id });
        res.send({ msg: "Myjournal deleted succesfully", success: true });
    } catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });
    }
};


exports.get_Journal_bycategory = asyncHandler(async (req, res) => {


    try {
        //  const { id: courseId, assignmentId } = req.params;
        const data = await Myjournal.find({ journal_category: req.params.id });
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ success: false, message: "Something went wrong!" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
    }

});





exports.update_myjournal = async (req, res) => {

    try {
        const Obj = req.body;
        const data = await Myjournal.findOneAndUpdate({ _id: req.params.id }, Obj);
        if (data) {
            return res.status(200).json({ success: true, message: `Success` });
        }
        return res.status(404).json({ success: false, message: `journal not found` });
    } catch (error) {
        return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
    }
};




exports.journalList_by_date = async (req, res) => {
    try {
        const { date } = req.params;

        // validate the date parameter
        if (!moment(date, 'YYYY-MM-DD').isValid()) {
            return res.status(400).json({ success: false, message: 'Invalid date format' });
        }

        const data = await Myjournal.find({ date });

        if (data.length === 0) {
            return res.status(404).json({ success: false, message: 'No journal entries found for the specified date' });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message.replace(/"/g, '') });
    }
};



// Run the cron job every minute



//  exports.get_compose = asyncHandler(async (req, res) => {

// let today = new Date();
//    let dd = String(today.getDate()).padStart(2, '0');
//    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// let yyyy = today.getFullYear();
//   let cdate = yyyy + '-' + mm + '-' + dd;
//    let hour = today.getHours();
//    hour = hour < 10 ? '0' + hour : hour;
//    let ctime = hour + ':' + today.getMinutes();
//   //today='2023-02-23';
//   console.log(ctime);
//    let datapost = await Compose.find()
//     .sort({ sortorder: 1 })
// .then((data) => {
//       let time = '';
//       let date = '';
//       for (i = 0; i < data.length; i++) {
//         date = data[i].date;
//         time = data[i].time;
//          if (cdate == date && time == ctime) {
//            //   console.log("datai", data[i])
//            let getdata = data[i]

//           let datsa = Compose.updateMany(
//              { status: 0 },
//             { $set: { status: 1 } },
// { new: true },
// function (err, result) {
//              if (err) {
// console.log(err);
//                } else {
//                 console.log(result);
//               }
//            }
//           );

//        }

//       }

//      })
//    let getdata = await Compose.find({ status: 1 })

//    res.send(getdata)

// .catch((error) => resp.errorr(res, error));

// })



exports.get_compose = asyncHandler(async (req, res) => {
    // Get current date and time
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let cdate = yyyy + '-' + mm + '-' + dd;
    let hour = today.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let ctime = hour + ':' + today.getMinutes();
    console.log(ctime);

    // Run the cron job every minute
    cron.schedule('* * * * *', async () => {
        let datapost = await Compose.find().sort({ sortorder: 1 });
        let time = '';
        let date = '';
        for (i = 0; i < datapost.length; i++) {
            date = datapost[i].date;
            time = datapost[i].time;
            if (cdate == date && time == ctime) {
                let getdata = datapost[i];
                let datsa = Compose.updateMany(
                    { status: 0 },
                    { $set: { status: 1 } },
                    { new: true },
                    function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                        }
                    }
                );
            }
        }

        let getdata = await Compose.find({ status: 1 });
        res.send(getdata);
    });
});


// exports.get_compose_schdule = asyncHandler(async (req, res) => {
//     // Get current date and time
//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, '0');
//     let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     let yyyy = today.getFullYear();
//     let cdate = yyyy + '-' + mm + '-' + dd;
//     let hour = today.getHours();
//     hour = hour < 10 ? '0' + hour : hour;
//     let ctime = hour + ':' + today.getMinutes();
//     console.log(ctime);

//     // Run the cron job every minute
//     cron.schedule('* * * * *', async () => {
//         let datapost = await Myjournal.find().sort({ sortorder: 1 });
//         let time = '';
//         let date = '';
//         for (i = 0; i < datapost.length; i++) {
//             date = datapost[i].date;
//             time = datapost[i].time;
//             if (cdate == date && time == ctime) {
//                 let getdata = datapost[i];
//                 let datsa = Compose.updateMany(
//                     { status: 0 },
//                     { $set: { status: 1 } },
//                     { new: true },
//                     function (err, result) {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             console.log(result);
//                         }
//                     }
//                 );
//             }
//         }

//         let getdata = await Compose.find({ status: 1 });
//         //console.log(getdata)
//         res.send(getdata);
//     });
// });