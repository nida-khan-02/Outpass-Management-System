const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
require('dotenv').config();

const router = express.Router();

// Register a new user (future expansion)
router.post('/register', async (req, res) => {
  try {
    const { name, college_id, password, hostelName, category } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      college_id,
      password: hashedPassword,
      hostelName,
      category
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    console.log('Received login request');
    const { college_id, password } = req.body;
    const user = await User.findOne({ college_id });
    console.log('User found:', user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, college_id: user.college_id, category: user.category },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

      res.json({ token, user: { id: user._id, category: user.category, hostelName: user.hostelName } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.college_id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/verify', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {

    const user = await User.findById(decoded.college_id).select('-password');
    console.log(user);
    if (!user) return res.status(400).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Token is not valid' });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newToken = jwt.sign(
      { userId: user._id, college_id: user.college_id, category: user.category },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

module.exports = router;
