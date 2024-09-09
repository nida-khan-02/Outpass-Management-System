const User = require("../models/User");
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM5YzM5NjQ1YzY3MWM2ZDhhNmU1NjUiLCJjYXRlZ29yeSI6InN0dWRlbnQiLCJpYXQiOjE3MjU2NDM3MTB9.DmkN-jHAv_ftcRqnTMxgsCVAlN7kU_CDlDdnipobx64');
    
    const user = await User.findById(decoded.college_id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.college_id,
      category: user.category,
      hostelName: user.hostelName,
    };
    console.log(req.user);  

    next();
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
