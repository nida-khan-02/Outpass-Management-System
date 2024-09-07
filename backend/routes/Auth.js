const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();

// Register a new user
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
    const { college_id, password } = req.body;
    const user = await User.findOne({ college_id });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, category: user.category }, process.env.JWT_SECRET,
      { expiresIn: '1h' });
      res.json({ token, user: { id: user._id, category: user.category } });
    // res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
