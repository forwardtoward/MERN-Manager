const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const {
  add_compose,
  get_compose,
  viewone_compose,
  del_compose,
  update_compose,
  // get_compose_schdule
} = require("../controllers/compose");



router.post("/add_compose", isAuthenticated, singleUploadControl, add_compose);
//router.post("/user/edit_media/:id",multipleUpload, edit_media);

router.get("/get_compose", isAuthenticated, get_compose);
router.get("/viewone_compose/:id", isAuthenticated, viewone_compose);
router.get("/del_compose/:id", isAuthenticated, del_compose);
router.post("/update_compose/:id", isAuthenticated, update_compose);
//router.get("/get_compose_schdule", isAuthenticated, get_compose_schdule);


module.exports = router;
