const express = require("express")

const router = express.Router();

const nodemailer = require('nodemailer');

router.post("", (req, res, next) => {
    const output = `<h2>
    <p>Customer Feedback Details: </h2> 
    <h3>Customer Name:</h3> <p> ${req.body.customerName}  </p> 
    <h3>Customer Email:</h3> <p>${req.body.email}</p>
    <h3>Subject:</h3> <p>${req.body.subject}  </p>
    <h3>Comment: </h3> <p>${req.body.comment}  </p>
    <h3>Image Uploaded:</h3> <p>*** This is diabled right now. Image uploaded will not be displayed here. ***  </p>
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
        to: 'amshuman.krishnamurthy@offrbox.com', // list of receivers
        subject: 'OffrBox - New Customer Feedback', // Subject line
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
    const email = req.body;
    console.log(email);
    res.status(201).json({
        message: 'Email received at server succesfully'
    });
});

router.use("", (req, res, next) => {
    const emailList = [
        {
            id: 'adfbrtbrt',
            email: 'sujatha@sujatha.com'
        },
        {
            id: 'adsdffbrtbrt',
            email: 'sujatha@sujji.com'
        }
    ]

    res.status(200).json(emailList);
});


module.exports = router;