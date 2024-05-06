const dontenv = require("dotenv");

dontenv.config();

const envProcess = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
  DB_NAME: process.env.DB_NAME,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  FRONTEND_BASEURI: process.env.FRONTEND_BASEURI,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = envProcess;
