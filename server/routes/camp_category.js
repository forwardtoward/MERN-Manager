const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const isAuthenticated = require("../middleware/auth");
 

const { addCategory, cmp_getallCategory,getoneCategory } = require("../controllers/camp_category");

router.post("/addCategory",isAuthenticated, addCategory);
router.get("/cmp_getallCategory",isAuthenticated, cmp_getallCategory);
router.get("/getoneCategory/:id",isAuthenticated, getoneCategory);


module.exports = router;
