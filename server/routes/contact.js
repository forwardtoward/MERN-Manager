const router = require("express").Router();
const {
  newContact,
  getAllContacts,
  updateContact,
  deleteContact,
  filesUpload,
  deleteUploadedFile,
  importContactsFromArray,
  importContacts,
} = require("../controllers/contact");
const {
  newContactValidator,
  updateContactValidator,
  getContactValidator,
  deleteContactValidator,
} = require("../validators/contact");
const isAuthenticated = require("../middleware/auth");
const results = require("../validators");
const { upload } = require("../lib/upload");

/**
 * Contact Management
 */
router.post("/add", isAuthenticated, newContactValidator, results, newContact);
router.get("/get", isAuthenticated, getContactValidator, results, getAllContacts);
router.post("/update/:id", isAuthenticated, updateContactValidator, results, updateContact);
router.delete("/delete/:id", isAuthenticated, deleteContactValidator, results, deleteContact);

/**
 * Upload File Management
 */
router.post("/upload-file", isAuthenticated, upload.single("file"), filesUpload);
router.post("/delete-file", isAuthenticated, deleteUploadedFile);

/**
 * Import Contact Files Management
 */
router.post("/import-contact-array", isAuthenticated, importContactsFromArray);
router.post("/import-contacts", isAuthenticated, importContacts);

module.exports = router;
