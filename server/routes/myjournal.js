const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");

const {
    add_MyJournal,
    myJournal_list,
    dltMyJournal,
    get_Journal_bycategory,
    getone_myJournal,
    personal_list,
    business_list,
    notes_list,
    update_myjournal,
    journalList_by_date } = require("../controllers/myjournal");




router.post("/add_MyJournal", isAuthenticated, singleUploadControl, add_MyJournal);
router.get("/myJournal_list", isAuthenticated, myJournal_list);

router.get("/dltMyJournal/:id", isAuthenticated, dltMyJournal);
router.get("/getone_myJournal/:id", isAuthenticated, getone_myJournal);
router.get("/get_Journal_bycategory/:id", isAuthenticated, get_Journal_bycategory);

router.post("/update_myjournal/:id", isAuthenticated, update_myjournal);
router.get("/journalList_by_date/:date", isAuthenticated, journalList_by_date);



module.exports = router;
