const Outpass = require('../models/Outpass');

exports.createOutpass = async (req, res) => {
  try {
    const newOutpass = new Outpass({ ...req.body, status: 'pending' });
    const savedOutpass = await newOutpass.save();
    res.status(201).json(savedOutpass);
  } catch (error) {
    console.error('Error creating outpass:', error);
    res.status(400).json({ message: 'Error creating outpass', error: error.message });
  }
};
exports.getOutpasses = async (req, res) => {
  try {
    const { hostelName } = req.query;
    const filter = hostelName ? { hostelName } : {};
    const outpasses = await Outpass.find(filter);
    res.status(200).json(outpasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOutpassStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOutpass = await Outpass.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOutpass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};