const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  add_comment,
  get_comment,
  viewone_comment,
  edit_comment,
  del_comment,
  comment_by_post,
} = require("../controllers/comment");

router.post("/add_comment", isAuthenticated, add_comment);
router.get("/get_comment", isAuthenticated, get_comment);
router.get("/viewone_comment/:id", isAuthenticated, viewone_comment);
router.get("/del_comment/:id", isAuthenticated, del_comment);

router.get("/comment_by_post/:id", isAuthenticated, comment_by_post);

module.exports = router;
