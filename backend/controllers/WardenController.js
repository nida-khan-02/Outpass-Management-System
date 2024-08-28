const User = require('../models/User');

exports.getWardenInfo = async (req, res) => {
  try {
    const warden = await User.findById(req.user.id).select('-password');
    if (!warden || warden.category !== 'warden') {
      return res.status(404).json({ message: 'Warden not found' });
    }
    res.json({ hostelName: warden.hostelName });
  } catch (error) {
    console.error('Error fetching warden info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
