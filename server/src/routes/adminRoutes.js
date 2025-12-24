// src/routes/adminRoutes.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/secret', auth, adminOnly, (req, res) => {
  res.status(200).json({
    message: 'Welcome Admin! This is a secret route.',
  });
});

module.exports = router;
