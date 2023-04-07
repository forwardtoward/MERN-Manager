const express = require("express");
const router = express.Router();
 
const isAuthenticated = require("../middleware/auth");
const {
    add_label,
    get_label,
    viewone_label,
    edit_label,
    del_label
    
} = require("../controllers/uproof_label");

 
 
 router.post("/add_label",isAuthenticated, add_label);
 router.get("/get_label",isAuthenticated, get_label);
 router.get("/viewone_label/:id",isAuthenticated, viewone_label);
 router.post("/edit_label/:id",isAuthenticated, edit_label);
 router.get("/del_label/:id",isAuthenticated, del_label);



 

module.exports = router;

