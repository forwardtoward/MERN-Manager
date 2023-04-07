const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyJournalSchema = new Schema(
  {
    date: {
      type: String,
    },
    journal_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journalCategory",
    },
    title: {
      type: String,
    },
    // type: {
    //   type: String,
    // },
    desc: {
      type: String,
    },
    jrnl_img: {
      type: String,
    },
    my_journal_id: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    // userId: {
    //   type: String,
    //   index: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myjournal", MyJournalSchema);
