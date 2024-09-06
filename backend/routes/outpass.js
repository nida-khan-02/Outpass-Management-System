const express = require('express');
const router = express.Router();  
const verifyToken = require('../middleware/verifyToken');
const isWarden = require('../middleware/isWarden');
const Outpass = require('../models/Outpass');

router.get('/api/outpasses', verifyToken, isWarden, async (req, res) => {
  try {
    const wardenHostel = req.user.hostelName;
    const outpasses = await Outpass.find({ hostelName: wardenHostel })
      .populate('student');
    res.status(200).json(outpasses);
  } catch (error) {
    console.error('Error fetching outpasses in outpass.js:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/api/outpass', verifyToken, async (req, res) => {
  try {
    const { fromDate, toDate} = req.body;
    const user = await User.findById(req.user.id);

    const newOutpass = new Outpass({
      studentId: req.user.id,
      studentName: user.name,
      hostelName: user.hostelName,
      fromDate,
      toDate,
      status: 'Pending'
    });

    await newOutpass.save();
    res.status(201).json({ message: 'Outpass request submitted successfully', outpass: newOutpass });
  } catch (error) {
    console.error('Error creating outpass:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;


