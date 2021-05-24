const express = require('express');
const router = express.Router();
const apiRoutes = require('./api/noteRoutes');
const htmlRoutes = require('./html/htmlRoutes');

// Prefix all routes defined in the api directory with `/api`
router.use('/api', apiRoutes);
// Prefix all routes defined in the api directory with `/api`
router.use('/', htmlRoutes);

module.exports = router;
