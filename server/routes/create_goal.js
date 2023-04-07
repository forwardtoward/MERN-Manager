const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
  create_goal,
  get_Goal,
  viewone_Goal,
  update_goal,
  del_goal,
} = require("../controllers/create_goal");

router.post("/create_goal", isAuthenticated, create_goal);
router.get("/get_Goal", isAuthenticated, get_Goal);
router.get("/viewone_Goal/:id", isAuthenticated, viewone_Goal);
router.post("/update_goal/:id", isAuthenticated, update_goal);
router.get("/del_goal/:id", isAuthenticated, del_goal);

module.exports = router;
