

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');  // Assuming User model is in ../models/User
// const router = express.Router();


// // Middleware for verifying JWT token
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM5YzM5NjQ1YzY3MWM2ZDhhNmU1NjUiLCJjYXRlZ29yeSI6InN0dWRlbnQiLCJpYXQiOjE3MjU2NDM3MTB9.DmkN-jHAv_ftcRqnTMxgsCVAlN7kU_CDlDdnipobx64');
//     req.user = decoded.user; // Extract user ID from the token
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// // // Route to get logged-in user's data
// // router.get('/user', authMiddleware, async (req, res) => {
// //   try {
// //     // Find the user by the ID stored in the JWT token
// //     const user = await User.findById(req.user.id); 
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }
    
// //     res.json({
// //       hostelName: user.hostelName,  // Return the user's hostelName
// //     });
// //   } catch (error) {
// //     console.error('Error fetching user:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });



// module.exports = router;

