const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");
const {
  createExpense,
  getExpense,
  updateExpenseById,
  deleteExpenseById,
  getExpenses,
} = require("../controllers/expense");

router.post("/", isAuthenticated, singleUploadControl, createExpense);
router.get("/", isAuthenticated, getExpenses);
router.get("/:id", isAuthenticated, getExpense);
router.patch("/:id", isAuthenticated, updateExpenseById);
router.delete("/:id", isAuthenticated, deleteExpenseById);

module.exports = router;
