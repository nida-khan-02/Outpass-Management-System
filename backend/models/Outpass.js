const mongoose = require('mongoose');

const outpassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // college_id: {
  //   type: String,
  //   required: true
  // },
  // studentId: {
  //   type: String,
  //   required: true
  // },
  hostelName: {
    type: String,
    required: true
  },
  leavingDate: {
    type: Date,
    required: true
  },
  leavingTime: {
    type: String,
    required: true
  },
  returningDate: {
    type: Date,
    required: true
  },
  returningTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Outpass', outpassSchema);



