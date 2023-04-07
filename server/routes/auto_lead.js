const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    add_auto_lead,
    autolead_url_list,
    update_auto_lead,
    del_auto_lead,
    viewone_auto_lead

} = require("../controllers/auto_lead");



router.post("/add_auto_lead", isAuthenticated, add_auto_lead);
router.get("/autolead_url_list", isAuthenticated, autolead_url_list);
router.put("/update_auto_lead/:id", isAuthenticated, update_auto_lead);
router.delete("/del_auto_lead/:id", isAuthenticated, del_auto_lead);
router.get("/viewone_auto_lead/:id", isAuthenticated, viewone_auto_lead);








module.exports = router;

