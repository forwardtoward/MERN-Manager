const express = require("express");
const router = express.Router();
//const { tokenverify } = require("../functions/tokenverify");
const {verifytoken} = require("../middleware/auth/verifytoken");

const {
    usersignup,
  adminlogin,
  login,
 
 } = require("../controllers/userTable");

router.post("/user/usersignup", usersignup);
router.post("/user/login", login);
router.post("/user/adminlogin", adminlogin);

// router.post("/user/setting", tokenverify, setting);
// router.post("/user/changepass", tokenverify, changepass);
// router.get("/user/myprofile", tokenverify, myprofile);
// router.post("/admin/edituser/:id", edituser);
// router.post("/user/changepassid/:id", changepassid);
// router.get("/admin/viewoneuser/:id", viewoneuser);
// router.get("/admin/allusers", allusers);
// router.get("/admin/enrollusers", enrollusers);
// router.get("/admin/deleteuser/:id", deleteuser);
// router.get("/admin/countuser", countuser);

module.exports = router;

//http://localhost:5000/api/admin/allusers
