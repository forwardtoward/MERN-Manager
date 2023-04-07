const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const productController = require("../controllers/product");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const { singleUploadControl } = require("../middleware/upload");

// product routes
router.get("/product_list", results, isAuthenticated, productController.productList);
router.post("/add_product", singleUploadControl, isAuthenticated, productController.create);
router.get("/info_product/:productId", results, isAuthenticated, productController.productInfo);
router.get("/public_products", results, productController.productPublicList);
router.get("/public_product/:productId", results, productController.productPublicInfo);
router.put("/update_by_Id/:productId", results, isAuthenticated, productController.productUpdate);
router.delete("/delete_product/:Id", isAuthenticated, results, productController.remove);

module.exports = router;
