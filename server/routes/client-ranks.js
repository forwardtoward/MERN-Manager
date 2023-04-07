const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addClientsInProgression,
  promoteClientRanks,
  removePromoted,
  notPromotedList,
  promotedList,
} = require("../controllers/clientRanks");

router.post("/add_client_into_progression", isAuthenticated, addClientsInProgression);
router.put("/promote_clients_rank", isAuthenticated, promoteClientRanks);
router.put("/add_clients_intoProgression", isAuthenticated, removePromoted);
router.get("/listof_not_Promoted_clients", isAuthenticated, notPromotedList);
router.get("/listof_Promoted_clients", isAuthenticated, promotedList);

module.exports = router;
