const express = require("express");

const bcrypt = require("bcryptjs") //external package to encrypt packages
const jwt = require("jsonwebtoken");

const router = express.Router()

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                noOfUnits: req.body.noOfUnits,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                applicantPhoneNo: req.body.applicantPhoneNo,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created.',
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        });  
});

//1. Check if email ID exists in the user model in the DB
//2. If it exits, take user password input, encrypt it and compare it to the existing hashed password in the DB
router.post("/signin", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "email not found in DB"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);        
        })

        .then((result) => { 
            if(!result) { //result is a boolean value. If value=false => passwords are mismatched 
                return res.status(401).json({
                    message: "Passwords mismatched"
                });
            }
            
            const token = jwt.sign(
                {email: fetchedUser.email, userID: fetchedUser._id, userFirstName: fetchedUser.firstName}, 
                process.env.JWT_KEY, 
                {expiresIn: "1h"}
                ); 
            res.status(200).json({
                token: token,
                expiresIn: 3600
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth Failed"
            }); 
        })
})

module.exports = router;