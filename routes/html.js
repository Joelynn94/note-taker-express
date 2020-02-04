const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'index.html'));
});

module.exports = router;