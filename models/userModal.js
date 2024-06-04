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
      unique: true,
    },
    phone: { type: String, default: null },
    addressDetails: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
    },
    dob: { type: Date, default: null },
    passwordHash: { type: String, required: [true, "Password is required"] },
    verification: { type: Boolean, default: false },
    verificationToken: { type: String, default: "" },
    resetToken: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["User", "Admin", "Government"],
      default: "User",
    },
  },
  { timestamps: true } // Enable timestamps (createdAt, updatedAt) for the schema
);

// Create the User model using the userSchema
const UserModal = mongoose.model("User", userSchema, "users");
// Exporting the User model
module.exports = UserModal;

/* const users = [];

for (let index = 0; index < 50; index++) {
  users.push({
    name: `${index}_Alice`,
    email: `${index}_Alice@example.com`,
    passwordHash: index,
  });
}

console.log(users);

UserModal.insertMany(users); */