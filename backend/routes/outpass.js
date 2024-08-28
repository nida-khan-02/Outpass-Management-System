router.get('/api/outpasses', verifyToken, isWarden, async (req, res) => {
  try {
    const wardenHostel = req.user.hostelName;
    const outpasses = await Outpass.find({ hostelName: wardenHostel });
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

module.exports = router;


