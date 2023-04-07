const router = require("express").Router();
const { insertAllDefault, getDefaultElements, insertDefault } = require("../controllers/defaultElements");
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

router.post("/insertAll", isAuthenticated, insertAllDefault);
router.get("/", isAuthenticated, getDefaultElements);
router.post("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], insertDefault);



module.exports = router;