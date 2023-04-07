const router = require("express").Router();

const {
  getMembershipTypes,
  addMembershipType,
  deleteMembershipType,
  putMembershipType
} = require("../controllers/membershipType");

const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, getMembershipTypes);
router.post('/add', isAuthenticated, addMembershipType);
router.delete("/:id", isAuthenticated, deleteMembershipType);
router.put('/:id', isAuthenticated, putMembershipType);
module.exports = router;


