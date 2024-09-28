const User = require("../models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = async (req, res, next) => {


  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token: ", decoded);
    const user = await User.findOne({ _id: decoded.userId });

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

  
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.college_id,
      category: user.category,
      hostelName: user.hostelName,
    };
    console.log("req.user in verifyToken middleware: ",req.user);  

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Token expired", expired: true });
        }
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });

    next();
  }  catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
