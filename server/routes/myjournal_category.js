const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

const { create_journal_category, get_journal_Category, update, del_category

} = require("../controllers/myjournal_category");

router.post("/create_journal_category", isAuthenticated, singleUploadControl, create_journal_category);
router.get("/get_journal_Category", isAuthenticated, get_journal_Category);

router.put("/update/:id", isAuthenticated, singleUploadControl, update);
router.delete("/del_category/:id", isAuthenticated, singleUploadControl, del_category);


module.exports = router;
