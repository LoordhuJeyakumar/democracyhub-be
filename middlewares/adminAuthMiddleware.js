const jwt = require("jsonwebtoken");
const UserModal = require("../models/user"); // Import your User model
const { getTokenFromRequest } = require("./authMiddleware");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    let getToken = await getTokenFromRequest(req);

    let decodedToken = jwt.verify(getToken, envProcess.JWT_SECRET);

    if (decodedToken) {
      // Find the user in the database
      const user = await UserModal.findById(decodedToken.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user is an admin
      if (!user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      // If the user is an admin, add their ID to the request object and call next()
      req.userId = decodedToken.id;
      next();
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
  }
};

module.exports = adminAuthMiddleware;
