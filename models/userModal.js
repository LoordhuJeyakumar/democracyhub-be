// Import Mongoose for interacting with MongoDB
const mongoose = require("mongoose");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

// Function to validate email format
const validateEmail = (e) => {
  // Regular expression for a valid email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // Return true if the email matches the pattern, false otherwise
  return emailPattern.test(e);
};

// Define the schema for the 'users' collection in MongoDB
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is requierd"] },
    email: {
      type: String,
      required: [true, "Email is requierd"],
      validate: validateEmail,
    },
    phone: { type: String, default: null },
    addressDetails: {
      address: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      pincode: { type: String, default: null },
    },
    dob: { type: Date, default: null },
    passwordHash: { type: String, required: [true, "Password is required"] },
    varification: { type: Boolean, default: false },
    verificationToken: { type: String, default: "" },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt) for the schema
);

// Create the User model using the userSchema
const UserModal = mongoose.model("User", userSchema, "users");
// Exporting the User model
module.exports = UserModal;
