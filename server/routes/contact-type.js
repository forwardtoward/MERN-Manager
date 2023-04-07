const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addContactType,
  getContactTypeByUserId,
  updateContactTypeById,
  delContactType,
} = require("../controllers/contactType");

router.post("/add", isAuthenticated, addContactType);
router.get("/getByUserId", isAuthenticated, getContactTypeByUserId);
router.get("/update/:id", isAuthenticated, updateContactTypeById);
router.get("/delete/:id", isAuthenticated, delContactType);

module.exports = router;
