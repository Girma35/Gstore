const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: '"Your Name" <girmawakeyo4@gmail.com>',
  to: "akilewayo87@gmail.com", // list of receivers
  subject: "Test Email from Node.js",
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error sending email: ", error);
  }
  console.log("Email sent successfully: ", info.response);
});
