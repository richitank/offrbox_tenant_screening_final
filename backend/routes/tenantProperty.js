const express = require('express');

const router = express.Router();

const checkTenantAuth = require("../middleware/check-tenant-auth");

const PropertyForm = require("../models/propertyForm");


router.get("", checkTenantAuth, (req, res, next) => {
    PropertyForm.find({})
        .then((documents) => {
            res.status(200).json({
                PropertyForm: documents
            });
        })
        .catch((error) => {
            console.log(error)
            res.status(401).json({
                error: error
            });
        })
})

module.exports = router;

