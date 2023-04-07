const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const { addCategory, cmp_getallCategory } = require("../controllers/camp_category");

router.post("/addCategory", isAuthenticated, addCategory);
// router.get("/cmp_getallCategory", isAuthenticated, cmp_getallCategory);
router.get("/cmp_getallCategory",isAuthenticated, cmp_getallCategory);
module.exports = router;
