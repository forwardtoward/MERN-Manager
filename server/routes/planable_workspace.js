const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    createWorkSpace,
    workSpace_list,
    dlt_workspace,
    viewone_workspace,
    update_planable_myWorkSpace

} = require("../controllers/planable_workspace");
const { response } = require("express");



router.post("/createWorkSpace", isAuthenticated, createWorkSpace);
router.get("/workSpace_list", isAuthenticated, workSpace_list);
router.get("/dlt_workspace/:id", isAuthenticated, dlt_workspace);
router.get("/viewone_workspace/:id", isAuthenticated, viewone_workspace);
router.post("/update_planable_myWorkSpace/:id", isAuthenticated, update_planable_myWorkSpace);



router.get("/getUrl", (req, res) => {
    const oauthcClient = new google.auth.OAuth2(
        "109381462500-8lja66d0g6srr34sgng051hjnnbmb9cv.apps.googleusercontent.com",
        "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",
        "http://localhost:3000/google/callback"

    )
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"]

    var url = oauthcClient.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        // state:JSON.stringify
    })
    request(url, (err, response) => {
        console.log("error", err)
        console.log("statuscode:", response)
        res.send({ url: url })
    })
})


module.exports = router;

