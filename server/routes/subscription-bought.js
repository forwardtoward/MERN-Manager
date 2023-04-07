const router = require("express").Router();
const { addSubscriptionForOrgs } = require("../controllers/subscriptionBought");
const isAuthenticated = require("../middleware/auth");


router.post("/organization", isAuthenticated, addSubscriptionForOrgs);
module.exports = router;