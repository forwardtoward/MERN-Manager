const express = require("express");
const router = express.Router();
const { createNote, getNotesBylclientId, updateNote, removeNote } = require("../controllers/notes");
const isAuthenticated = require("../middleware/auth");

router.post("/followup_note/add_note/:clientId", isAuthenticated, createNote);
router.get("/followup_note/get_client_notes/:clientId", isAuthenticated, getNotesBylclientId);
router.put("/followup_note/update_note/:noteId", isAuthenticated, updateNote);
router.delete("/followup_note/remove_note/:noteId", isAuthenticated, removeNote);

module.exports = router;
