const express = require("express")

const ScreeningRequestForm = require("../models/screeningRequestForm")
const router = express.Router();


//Get/Fetch Data from DB for the TenantView. Called from OffrBox - TenantView Application.
router.get("", (req, res, next) => {
    ScreeningRequestForm.find()
        .then(documents => {
            res.status(200).json({
                ScreeningRequestForms: documents
            });
        })
        .catch((error) => {
            console.log("Error:" + error)
        })

});

module.exports = router;