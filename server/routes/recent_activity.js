const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");
const results = require("../validators");

const {
    add_recent_actvty,
    get_RecentActvity,
    del_RecentActvity,
    viewone_RecentActvity,
    update_RecentActvity,
} = require("../controllers/recent_activity");




router.post("/add_recent_actvty", isAuthenticated, singleUploadControl, add_recent_actvty);
router.get("/get_RecentActvity/:userId/:campaignId", isAuthenticated, get_RecentActvity);

router.delete("/del_RecentActvity/:id", isAuthenticated, del_RecentActvity);
router.get("/viewone_RecentActvity/:id", isAuthenticated, viewone_RecentActvity);

router.put("/update_RecentActvity/:id", isAuthenticated, update_RecentActvity);



module.exports = router;
