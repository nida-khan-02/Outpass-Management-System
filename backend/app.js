const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const outpassRoutes = require('./routes/outpass');
require('dotenv').config();



const outpassController = require('./controllers/OutpassController');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true

}));
app.use(express.json());
app.use('/api', outpassRoutes);
app.use('/api/auth', require('./routes/Auth'));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nida02k:U63PY33YY3g2flJQ@database.ul9ut.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Database';

mongoose.connect(MONGODB_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.post('/api/outpass', outpassController.createOutpass);
app.get('/api/outpasses', outpassController.getOutpasses);
app.put('/api/outpass/:id', outpassController.updateOutpassStatus);


// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Welcome to backend");
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

