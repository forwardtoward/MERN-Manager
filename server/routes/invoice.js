const router = require("express").Router();
const {
  createInvoice,
  getInvoices,
  updateInvoiceById,
  getInvoiceById,
  deleteInvoiceById,
  sendInvoiceEmail,
  filterInvoice,
  filterByStatusInvoice,
  searchTextInvoice,
  addPayment,
} = require("../controllers/invoice");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

router.post("/", isAuthenticated, singleUploadControl, createInvoice);
router.get("/", isAuthenticated, getInvoices);
router.get("/:id", getInvoiceById);
router.get("/search/invoice", isAuthenticated, searchTextInvoice);
router.get("/filter/invoice/:TypeOfDate", isAuthenticated, filterInvoice);
router.get("/filter-status/invoice/:statusType", isAuthenticated, filterByStatusInvoice);
router.post("/send-email", isAuthenticated, sendInvoiceEmail);
router.patch("/:id", isAuthenticated, singleUploadControl, updateInvoiceById);
router.put("/:id", addPayment);
router.delete("/:id", isAuthenticated, deleteInvoiceById);

module.exports = router;
