const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addmembership,
  addproduct,
  removemembership,
  getitems,
  addUpdateProductToUserCart,
  deleteProductFromUserCart,
  getProductsFromUserCart,
  updateProductAmount
} = require("../controllers/cart");

router.post("/add_membership", isAuthenticated, addmembership);
router.post("/add_product", isAuthenticated, addproduct);
router.post('/update_amount', isAuthenticated, updateProductAmount);
router.post("/remove_membership/:membershipId", isAuthenticated, removemembership);
router.get("/get_items", isAuthenticated, getitems);
// TODO: gettickets by status, update ticket message.

router.put("/", isAuthenticated, addUpdateProductToUserCart);
router.get("/", isAuthenticated, getProductsFromUserCart);
router.post("/delete_product", isAuthenticated, deleteProductFromUserCart);

module.exports = router;
