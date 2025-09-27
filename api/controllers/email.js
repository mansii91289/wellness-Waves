
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.COMPANY_EMAIL,
//     pass: process.env.COMPANY_EMAIL_PASSWORD,
//   },
// });

// export const sendEmail = async (mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error("Email sending error:", error);
//     throw error;
//   }
// };
// test-email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send messages");
  }
});