const express = require("express")

const router = express.Router();

const nodemailer = require('nodemailer');

const checkAuth = require("../middleware/check-auth")

const ScreeningRequestForm = require('../models/screeningRequestForm')


router.post("", checkAuth, (req, res, next) => {

    if (req.body.screeningCost == 1) {
        req.body.screeningCost = 39.99
    }
    else if (req.body.screeningCost == 2 || req.body.screeningCost == 3) {
        req.body.screeningCost = 24.99
        console.log(req.body.screeningCost)
    }

    const output = `<h3> 
    <p>Hi ${req.body.applicantFirstName}, </h3>, 
    <br> 
    <p> The owner of a property has requested a security screening from you. If you're interested with the property, you'll have to complete the security screening and pay.</p> 
    <p> You'll be charged ${req.body.screeningCost} for the screening.</p>
    <br>
    <p>Please go to the following link to proceed: <a href="http://offrbox-tenant-view.s3-website.us-east-2.amazonaws.com/">Get Started</a></p>
    <br>
    <p>Have questions? Please contact <a href="http://offrbox-tenantscreening.s3-website.us-east-2.amazonaws.com/"> Customer Support</a></p>
    <br>
    <br>
    <p>Cheers</p>
    <p>OffrBox, Inc</p>
    <p>6000 Fairviw Rd,</p>
    <br>
    <p>Charlotte, NC 28210</p>
    <br>
    <br>
    <p>Please do reply to this mail. This inbox is not maintained. Click on Customer Support to reach out with your queries.<p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'amshu.k1956@gmail.com', // generated ethereal user
            pass: 'qazwsx6969'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"OffrBox" <amshu.k1956@gmail.com>', // sender address
        to: req.body.applicantEmail, // list of receivers
        subject: 'OffrBox - Background Screening Required', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: 'Email has been sent' });
    });


    //Inserting data to DB
    const signupForm = new ScreeningRequestForm({
        applicantFirstName: req.body.applicantFirstName,
        applicantLastName: req.body.applicantLastName,
        applicantEmail: req.body.applicantEmail,
        applicantPhoneNo: req.body.applicantPhoneNo,
        screeningCost: req.body.screeningCost,
        creator: req.userData.userId
    });
    signupForm.save();

    res.status(201).json({

        message: 'Email received at server succesfully'
    });
});


//Get/Fetch Data from DB for the Owner
router.get("/getInfo", checkAuth, (req, res, next) => {
    ScreeningRequestForm.find({ creator: req.userData.userId })
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