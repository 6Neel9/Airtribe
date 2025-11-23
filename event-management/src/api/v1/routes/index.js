// src/api/v1/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const eventsRoutes = require('./event.routes');

router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
