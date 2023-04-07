const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const shop = require("../controllers/shop");

router.post("/create", isAuthenticated, shop.createShop);
router.get("/get", isAuthenticated, shop.shopByUser);
router.get("/shop_by_id/:Id", isAuthenticated, results, shop.getShopById);
router.put("/update/:Id", isAuthenticated, shop.update);
router.delete("/shop_delete_by_id/:Id", isAuthenticated, results, shop.delete);
router.get("/check-shop-path/:path", shop.checkShopPath);

// get shop products
router.get("/:id/products", isAuthenticated, shop.getProducts);

// get public shop
router.get("/public/get/:path", shop.shopByPath);

module.exports = router;
