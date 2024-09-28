const express = require('express');
const router = express.Router();  
const verifyToken = require('../middleware/verifyToken');
const isWarden = require('../middleware/isWarden');
const Outpass = require('../models/Outpass');
const User = require('../models/User');

router.get('/api/outpasses', verifyToken, isWarden, async (req, res) => {
  try {
    const wardenHostel = req.user.hostelName;
    const status = req.query.status || 'pending'; // Default to pending if not specified
    const outpasses = await Outpass.find({ 
      hostelName: wardenHostel,
      status: status
    }).populate('student');
    res.status(200).json(outpasses);
  } catch (error) {
    console.error('Error fetching outpasses in outpass.js:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/outpasses/student/:college_id', verifyToken, async (req, res) => {
  console.log("Fetching outpasses for college_id:", req.params.college_id); 

  try {
    const outpasses = await Outpass.find({ college_id: req.params.college_id });
    res.json(outpasses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching outpasses', error: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const newOutpass = new Outpass({
      ...req.body,
      college_id: req.user.id 
    });
    const savedOutpass = await newOutpass.save();
    res.status(201).json(savedOutpass);
  } catch (error) {
    res.status(400).json({ message: 'Error creating outpass', error: error.message });
  }
});


module.exports = router;


