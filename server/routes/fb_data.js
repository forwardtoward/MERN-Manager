const express = require("express");
const router = express.Router();


const {
    add_fb_workspace,
    get_workspace_data


} = require("../controllers/fb_data");



router.post("/user/add_fb_workspace", add_fb_workspace);
router.get("/user/get_workspace_data", get_workspace_data);






module.exports = router;

