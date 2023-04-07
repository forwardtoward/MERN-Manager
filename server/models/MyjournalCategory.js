const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myJournalCatSchema = new Schema(
    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true,
        },

        title: {
            type: String,
        },
        count: {
            type: Number,
            default: 0
        },
        desc: {
            type: String,

        },
        jrnl_img: {
            type: String
        },
        userId: {
            type: String,
            index: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("journalCategory", myJournalCatSchema);
