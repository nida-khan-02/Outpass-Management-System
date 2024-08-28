const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/WardenController');
const authMiddleware = require('../middleware/auth');

router.get('/info', authMiddleware, wardenController.getWardenInfo);

module.exports = router;
