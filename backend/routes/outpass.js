const express = require('express');
const router = express.Router();  // Create a router instance
const verifyToken = require('../middleware/verifyToken');
const isWarden = require('../middleware/isWarden');
const Outpass = require('../models/Outpass');

router.get('/api/outpasses', verifyToken, isWarden, async (req, res) => {
  try {
    const wardenHostel = req.user.hostelName;
    const outpasses = await Outpass.find({ hostelName: wardenHostel })
      .populate('student', 'college_id');
    res.status(200).json(outpasses);
  } catch (error) {
    console.error('Error fetching outpasses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/outpass/:id - Update outpass status
router.put('/api/outpass/:id', verifyToken, isWarden, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const outpass = await Outpass.findById(id);

    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }

    // Ensure warden can only update outpasses from their hostel
    if (outpass.hostelName !== req.user.hostelName) {
      return res.status(403).json({ message: 'You do not have permission to update this outpass' });
    }

    outpass.status = status;
    await outpass.save();

    res.status(200).json({ message: 'Outpass status updated successfully', outpass });
  } catch (error) {
    console.error('Error updating outpass status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//cody
router.post('/api/outpass', verifyToken, async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;
    const user = await User.findById(req.user.id);

    const newOutpass = new Outpass({
      studentId: req.user.id,
      studentName: user.name,
      college_id: user.college_id,
      hostelName: user.hostelName,
      fromDate,
      toDate,
      reason,
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


