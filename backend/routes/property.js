const express = require('express');

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const PropertyForm = require("../models/propertyForm");

router.post("", checkAuth, (req, res, next) => {
    const property = new PropertyForm({
        propertyType: req.body.propertyType,
        propertyAddress: req.body.propertyAddress,
        propertyAddress2: req.body.propertyAddress2,
        propertyCity: req.body.propertyCity,
        propertyState: req.body.propertyState,
        propertyZipCode: req.body.propertyZipCode,
        propertyImage: req.body.propertyImage,

        creator: req.userData.userId,
        creatorFirstName: req.userData.userFirstName
    });
    property.save();
    res.status(201).json({
        message: "Property Listing Inserted."
    });

})

router.get("", checkAuth, (req, res, next) => {
    PropertyForm.find({ creator: req.userData.userId })
        .then((documents) => {
            res.status(200).json({
                PropertyForm: documents
            });
        })
        .catch((error) => {
            res.status(401).json({
                error: error
            });
        })
})

router.delete("/:id", checkAuth, (req, res, next) => {
    PropertyForm.findByIdAndRemove(req.params.id,
        res.status(200).json({ message: "Property Deleted." }),
        ((error) => {
            console.log(error)
        }),
    );
})

module.exports = router;