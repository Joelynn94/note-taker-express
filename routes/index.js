const express = require('express');
const router = express.Router();
const apiRoutes = require('./api/noteRoutes');

// Prefix all routes defined in the api directory with `/api`
router.use('/api', apiRoutes);

module.exports = router;
