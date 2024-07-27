const nodemailer = require('nodemailer');
require('dotenv').config(); // Import and configure dotenv

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use another email service provider
    auth: {
        user: "mukul.22scse2030209@galgotiasuniversity.edu.in", // Use the email from .env file
        pass: "Muku1gupt@ " // Use the password from .env file
    }
});

// Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "mukul.22scse2030209@galgotiasuniversity.edu.in", // Use the email from .env file
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
