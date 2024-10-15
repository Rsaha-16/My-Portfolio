const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer"); // Import nodemailer

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission and send email
app.post('/', function (req, res) {
    const sender = req.body.sender;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    console.log(sender);
    console.log(email);
    console.log(subject);
    console.log(message);

    // Set up transporter using SMTP (e.g., Gmail SMTP)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saharajarshi7126@gmail.com', // Your Gmail address
            pass: 'ezulohsvocnokxkp'     // Replace with the 16-character App Password
        }
    });
    

    // Define email options
    const mailOptions = {
        from: email, // Sender's email address
        to: 'saharajarshi7126@gmail.com', // Your email address (recipient)
        subject: subject, // Subject of the email
        text: `You received a new message from ${sender} (${email}):\n\n${message}` // Email message
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('There was an error sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Mail sent successfully!');
        }
    });
});

app.listen(5000, function () {
    console.log("Server is running on port 5000");
});
