const express = require("express")

const router = express.Router();

const nodemailer = require('nodemailer');

const checkTenantAuth = require("../middleware/check-tenant-auth");


router.post("", checkTenantAuth, (req, res, next) => {
    console.log(req.body)

    const output = `<h2> 
    <p>${req.body.name}, </h2>
    <br> 
    <p> This is notify that, you've been added as a co-applicant by _________.
    <br>
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
        to: req.body.email, // list of receivers
        subject: 'OffrBox - Added as Co-Applicant', // Subject line
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

    res.status(201).json({

        message: 'Email received by Co-Applicant'
    });
});

module.exports = router;