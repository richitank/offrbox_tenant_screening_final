const express = require("express");
const TenantUser = require("../models/tenant-user")
const bcrypt = require("bcryptjs") //external package to encrypt packages
const jwt = require("jsonwebtoken");

const router = express.Router()



router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const tenantUser = new TenantUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                applicantPhoneNo: req.body.applicantPhoneNo,
                email: req.body.email,
                password: hash
            });
            tenantUser.save()
                .then(result => {
                    res.status(201).json({
                        message: "Tenant User Created",
                        res: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        });
});

router.post("/signin", (req, res, next) => {
    let fetchedTenantUser;
    TenantUser.findOne({ email: req.body.email })
        .then(tenantUser => {
            if (!tenantUser) {
                return res.status(401).json({
                    message: "Email ID not found in the DB"
                })
            }
            fetchedTenantUser = tenantUser
            return bcrypt.compare(req.body.password, tenantUser.password);

        })

        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "incorrect password"
                });
            }

            const token = jwt.sign(
                { email: fetchedTenantUser.email, tenantUserId: fetchedTenantUser._id },
                process.env.JWT_KEY, { expiresIn: "1h" })
            res.status(200).json({
                tenantToken: token,
                expiresIn: 3600
            })
        })
        .catch(error => {
            res.status.json({
                message: "error at bcrypt compare",
                error: error
            })
        })
});

module.exports = router;

