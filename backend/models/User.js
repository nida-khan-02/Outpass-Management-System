const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hostelName: { type: String, required: true },
  category: { type: String, enum: ['student', 'warden'], required: true }
});

module.exports = mongoose.model('User', userSchema);
