// const express = require('express');
// const Outpass = require('../models/Outpass');
// const User = require('../models/User');

// const router = express.Router();

// // Apply for an outpass
// router.post('/apply', async (req, res) => {
//   try {
//     const { studentId, name, hostelName, leavingDate, leavingTime, returningDate, returningTime } = req.body;

//     const outpass = new Outpass({
//       studentId,
//       name,
//       hostelName,
//       leavingDate,
//       leavingTime,
//       returningDate,
//       returningTime
//     });

//     await outpass.save();
//     res.status(201).json({ message: 'Outpass applied successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get outpasses for a warden
// router.get('/warden/:wardenId', async (req, res) => {
//   try {
//     const warden = await User.findById(req.params.wardenId);

//     if (!warden || warden.category !== 'warden') {
//       return res.status(400).json({ error: 'Invalid warden' });
//     }

//     const outpasses = await Outpass.find({ hostelName: warden.hostelName });
//     res.json(outpasses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get outpasses for a student
// router.get('/student/:studentId', async (req, res) => {
//   try {
//     const outpasses = await Outpass.find({ studentId: req.params.studentId });
//     res.json(outpasses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Outpass = require('../models/Outpass');


//cody
// Get outpasses for a specific hostel and status
router.get('/outpasses', async (req, res) => {
  try {
    const { hostel, status } = req.query;
    const outpasses = await Outpass.find({ hostelName: hostel, status });
    res.json(outpasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//cory
router.get('/outpasses/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const outpasses = await Outpass.find({ studentId });
    res.json(outpasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update outpass status
router.put('/outpasses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOutpass = await Outpass.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedOutpass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// // POST: Submit Outpass
// router.post('/api/outpass', async (req, res) => {
//   try {
//     const outpass = new Outpass(req.body);
//     await outpass.save();
//     res.status(201).send(outpass);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to submit outpass' });
//   }
// });

// // GET: Fetch Outpasses by Hostel Name
// router.get('/outpass/:hostelName', async (req, res) => {
//   try {
//     const outpasses = await Outpass.find({ hostelName: req.params.hostelName });
//     res.send(outpasses);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to retrieve outpasses' });
//   }
// });

// // PATCH: Update Outpass Status
// router.patch('/outpass/:id', async (req, res) => {
//   try {
//     const outpass = await Outpass.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//     res.send(outpass);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to update outpass status' });
//   }
// });

module.exports = router;

