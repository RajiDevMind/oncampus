require("dotenv").config();
const nodemailer = require("nodemailer");
// sending notification on register
function sendEmailNotification(username, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omoiyaalasso@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "omoiyaalasso@gmail.com",
    to: email,
    subject: "Successfully Registered! You joined the big man team",
    text: `Hello ${username},\n\nThank you for registering!\n\n You have join the winning team. Kindly update your profile and post regularly to recieve a reward from our team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmailNotification;
