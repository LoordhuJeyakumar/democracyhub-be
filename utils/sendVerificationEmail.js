const nodemailer = require("nodemailer"); // Import nodemailer for sending emails
const verificaionEmailMsg = require("./verificaionEmailMsg"); // Import function to generate verification email message content
const envProcess = require("./config"); // Import environment variables configuration

// Async function to send a verification email to the user
async function sendVerificationEmail(user) {
  try {
    // Construct the verification email URL using environment variables and user data
    let URL = `${envProcess.FRONTEND_BASEURI}users/${user._id}/${user.verificationToken}`;

    // Create a Nodemailer transport object with configuration from environment variables
    const transporter = nodemailer.createTransport({
      host: envProcess.EMAIL_HOST,
      port: envProcess.EMAIL_PORT,
      secure: envProcess.EMAIL_SECURE, // Use SSL for secure connection
      auth: {
        user: envProcess.EMAIL_USER,
        pass: envProcess.EMAIL_PASS,
      },
    });

    // Verify the transporter connection before sending emails
    await transporter.verify();

    // Create the email message object with sender, recipient, subject, and HTML content
    const message = {
      from: envProcess.EMAIL_USER,
      to: user.email,
      subject: "Verify Your Email & Unlock DemocracyHUB!",
      html: verificaionEmailMsg(URL, user.name), // Generate HTML content using imported function
    };

    // Send the email using the transporter and handle success or failure
    let isSend = await transporter.sendMail(message);
    if (isSend) {
      return isSend;
    } else {
      console.log("Email Sent failed");
      return false;
    }
  } catch (error) {
    // Logging any errors that occur during the process
    console.log("Email not sent");
    console.log(error);
  }
}

// Exporting the sendVerificationEmail function
module.exports = sendVerificationEmail;
