const User = require("../models/user");
const jwt = require("jsonwebtoken"); // Make sure to import jwt
require("dotenv").config();

module.exports.getUsers = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization; // Assumes "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded);
    
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch users (you can also use .populate() if needed)
    const users = await User.find(); // Fetch all users
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
