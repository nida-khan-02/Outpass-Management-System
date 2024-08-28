const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Get token from headers
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
    // Fetch user from database
    req.user = {
      id: User._id,
      category: User.category,
      hostelName: User.hostelName,
    };

    next();
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
