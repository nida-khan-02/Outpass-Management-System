
// const User = require("../models/User");
// const jwt = require('jsonwebtoken');


// const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = {
//       id: user._id,
//       category: user.category,
//       hostelName: user.hostelName,
//     };

//     next();
//   } catch (error) {
//     console.error("Error in verifyToken middleware:", error);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyToken;

const User = require("../models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      category: user.category,
      hostelName: user.hostelName,
    };

    next();
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
