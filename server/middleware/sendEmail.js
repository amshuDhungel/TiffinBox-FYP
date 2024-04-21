import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7975a05d48c7bd",
      pass: "aaee815bab73ae",
    },
  });

  const mailOptions = {
    from: process.env.SMPT_SERVICE,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
