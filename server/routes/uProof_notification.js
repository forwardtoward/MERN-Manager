const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    add_uproof_noti,
    list_uproof_noti,
    update_uproof_noti,
    getone_uproof_noti,
    dlt_uproof_noti
    
} = require("../controllers/uProof_notification");

 
 
 router.post("/add_uproof_noti",isAuthenticated, add_uproof_noti);
 router.get("/list_uproof_noti", isAuthenticated,list_uproof_noti);
 router.get("/getone_uproof_noti/:id", isAuthenticated,getone_uproof_noti);
 router.post("/update_uproof_noti/:id", isAuthenticated,update_uproof_noti);
 router.get("/dlt_uproof_noti/:id", isAuthenticated,dlt_uproof_noti);



 

module.exports = router;

