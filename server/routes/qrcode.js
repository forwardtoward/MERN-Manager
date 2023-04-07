const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const {
  newQRCode,
  getAllQRCode,
  getQRCode,
  getCollabrators,
  updateWorkspace,
  shareWorkspace,
  shareRevertWorkspace,
  deleteQRCode,
} = require("../controllers/qrcodeLibrary");

router.get("/get-all/:userid", isAuthenticated, results, getAllQRCode);
router.get("/get/:qrcodeuuid", results, getQRCode);
// router.get("/get-collabrators", isAuthenticated, results, getCollabrators);

router.post("/add", isAuthenticated, results, newQRCode);
router.delete("/delete/", isAuthenticated, results, deleteQRCode);

// router.post("/share", isAuthenticated, results, shareWorkspace);
// router.post("/share-revert", isAuthenticated, results, shareRevertWorkspace);
// router.post("/update", isAuthenticated, results, updateWorkspace);

// router.delete("/delete/:_id", isAuthenticated, results, deleteWorkspace);

module.exports = router;
