const router = require("express").Router();
const {
  createStripeCustomer,
  createStripeMembership,
  createStripeSubscription,
  createStripeCard,
  createStripeCharge,
  createStripePaymentIntent,
  getStripePaymentIntent,
  updateStripePaymentIntent,
  sendPK,
} = require("../controllers/payment");
const isAuthenticated = require("../middleware/auth");

router.post("/user/:userId/stripe/customer", isAuthenticated, createStripeCustomer);

router.get("/user/:userId/stripe/payment-intent/:id", isAuthenticated, getStripePaymentIntent);
router.put("/user/:userId/stripe/payment-intent/:id", isAuthenticated, updateStripePaymentIntent);

// alternatives to payment-intent API
router.post("/user/:userId/stripe/card", isAuthenticated, createStripeCard);
router.post("/user/:userId/stripe/charge", isAuthenticated, createStripeCharge);

router.get("/stripe/config", sendPK);
router.post("/stripe/payment-intent", createStripePaymentIntent);
router.post("/stripe/membership", isAuthenticated, createStripeMembership);
router.post("/stripe/subscription", isAuthenticated, createStripeSubscription);

module.exports = router;
