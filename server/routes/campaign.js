const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
  add_Campaign,
  get_Campaign,
  viewone_Campaign,
  del_campign,
  update_campaign,
  del_multiple_campign
} = require("../controllers/campaign");

router.post("/add_Campaign", isAuthenticated, add_Campaign);
router.get("/get_Campaign", isAuthenticated, get_Campaign);
router.get("/viewone_Campaign/:id", isAuthenticated, viewone_Campaign);
router.get("/del_campign/:id", isAuthenticated, del_campign);
router.post("/update_campaign/:id", isAuthenticated, update_campaign);
router.delete("/del_multiple_campign/:idsToDelete", isAuthenticated, del_multiple_campign);


module.exports = router;
