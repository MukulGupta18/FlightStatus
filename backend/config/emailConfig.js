const nodemailer = require('nodemailer');
require('dotenv').config(); // Import and configure dotenv

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: "EMAIL_USER",
        pass: "EMAIL_PASS " 
    }
});

// Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "EMAIL_USER", 
        to: "mgofficial20@gmail.com",
        subject: "Update",
        text: text
    };

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
