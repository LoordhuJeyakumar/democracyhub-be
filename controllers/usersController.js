const bcrypt = require("bcrypt"); // Import the bcrypt library for password hashing
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library for creating and verifying tokens
const envProcess = require("../utils/config"); // Import environment configuration
const sendVerificationEmail = require("../utils/sendVerificationEmail"); // Import the function for sending verification emails
const { UserModal } = require("../models/userModal"); // Import the UserModal

// Function to validate email format
const validateEmail = (e) => {
  // Regular expression for a valid email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // Return true if the email matches the pattern, false otherwise
  return emailPattern.test(e);
};

// Async function to send a verification email to the user
async function sendEmail(doc) {
  try {
    // Send verification email
    const verificationEmail = await sendVerificationEmail(doc);
    console.log("Verification email sent successfully");
    return verificationEmail;
  } catch (error) {
    console.log("Error sending verification email");
    console.log(error);
    return error;
  }
}

// Users controller object containing user management functions
const usersController = {
  // Create a new user
  createUser: async (request, response) => {
    try {
      // Extract name, password, and email from request body with email converted to lowercase
      const { name, password } = request.body;
      const email = request.body.email?.toLowerCase();

      // Check for required fields (name, password, and email)
      if (!name || !password || !email) {
        return response
          .status(400) //If any one of them undefined return Bad Request
          .json({ message: "Name, Password and Email are requierd" });
      }

      // Validate email format using the validateEmail function
      if (!validateEmail(email)) {
        return response
          .status(400) //if it's not valid return Bad Request
          .json({ message: "Please enter valid email" });
      }

      // Check if a user with the same email already exists
      let existingUser = await UserModal.findOne({ email: email });

      // Handle existing user scenarios
      if (existingUser) {
        // User already exists and verified, return conflict
        if (existingUser.varification) {
          return response.status(409).json({
            message: `User with '${email}' already exists`,
          });
        } else {
          // User already exists but not verified, inform user to verify
          return response.status(409).json({
            message: `User with '${email}' already exists, Please verify your email to activate`,
          });
        }
      }

      // Hash the password using bcrypt
      const passwordHash = await bcrypt.hash(password, 10);

      // Create a JWT verification token with user information
      const verificationToken = jwt.sign(
        {
          name,
          email,
        },
        envProcess.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Create a new User model instance with extracted data and token
      let newUser = await UserModal({
        name,
        email,
        passwordHash,
        verificationToken,
      });

      // Save the new user to the database
      let savedUser = await newUser.save();

      if (savedUser) {
        // User creation successful, send verification email
        response.status(201).json({
          message:
            "User created successfully, Plaese check your email for verification",
        });
      }

      // Attempt to send verification email using the sendEmail function
      /* 
      Note that the sendEmail function is called after the user document has been saved, and the response is sent before the email is sent. This ensures that the response is returned immediately, while the email sending process runs in the background.
      */
      let emailInfo = await sendEmail(savedUser);
      if (!emailInfo) {
        console.error("Error sending verification email");
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  login: async (request, response) => {
    try {
      const password = request.body?.password;
      const email = request.body.email?.toLowerCase();
      if (!password || !email) {
        return response
          .status(400) //If any one of them undefined return Bad Request
          .json({ message: "Password and Email are requierd" });
      }

      let user = await UserModal.findOne({ email: email });
      if (!user) {
        return response
          .status(401)
          .json({ message: "user does not exist, Please register!" });
      }

      if (!user.varification) {
        return response.status(403).json({
          message: "Your account is InActive, Please verify your email",
        });
      }

      const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

      if (!isAuthenticated) {
        return response.status(401).json({ message: "invalid password" });
      }
      const accessToken = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        envProcess.JWT_SECRET,
        { expiresIn: "8h" }
      );
      return response.status(200).json({
        message: "Login succesfull",
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  retrieveUser: async (request, response) => {
    try {
      const { userId } = request.params;
      if (!userId) {
        return response.status(400).json({ message: "UserId missing" });
      }

      let user = await UserModal.findById(userId, {
        verificationToken: 0,
        passwordHash: 0,
        _v: 0,
      });

      if (!user) {
        return response
          .status(401)
          .json({ message: "user does not exist, Please check userId!" });
      }
      return response
        .status(200)
        .send({ message: "User details fetched", user });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = usersController;
