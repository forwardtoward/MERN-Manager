const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");
const {
  createIncome,
  getIncomes,
  getIncome,
  deleteIncomeById,
  updateIncomeById,
} = require("../controllers/income");

router.post("/", isAuthenticated, singleUploadControl, createIncome);
router.get("/", isAuthenticated, getIncomes);
router.get("/:id", isAuthenticated, getIncome);
router.patch("/:id", isAuthenticated, updateIncomeById);
router.delete("/:id", isAuthenticated, deleteIncomeById);

module.exports = router;
