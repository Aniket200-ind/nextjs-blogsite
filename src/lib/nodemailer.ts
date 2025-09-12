//! File: src/lib/nodemailer.ts

import nodemailer from "nodemailer";

const configOptions = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(configOptions);

export default transporter;
