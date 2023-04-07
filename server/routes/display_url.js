const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    add_display_url,
    display_url_list,
    update_display_url,
    del_display_url

} = require("../controllers/display_url");



router.post("/add_display_url", isAuthenticated, add_display_url);
router.get("/display_url_list", isAuthenticated, display_url_list);
router.put("/update_display_url/:id", isAuthenticated, update_display_url);
router.delete("/del_display_url/:id", isAuthenticated, del_display_url);








module.exports = router;

