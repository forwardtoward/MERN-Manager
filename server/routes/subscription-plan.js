const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  createPlan,
  getPlan,
  //getPlanByOrg,
  updatePlanById,
  deletePlanById,
  getPlans,
} = require("../controllers/subscriptionPlan");

router.post("/", isAuthenticated, createPlan);
router.get("/", isAuthenticated, getPlans);
router.get("/:id", isAuthenticated, getPlan);
//router.get("/organization/:orgId", isAuthenticated, getPlanByOrg);
router.patch("/:id", isAuthenticated, updatePlanById);
router.delete("/:id", isAuthenticated, deletePlanById);

module.exports = router;
