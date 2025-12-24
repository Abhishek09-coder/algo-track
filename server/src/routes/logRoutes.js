// src/routes/logRoutes.js
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const {
  createLog,
  getLogs,
  getLogHistory,
} = require('../controllers/logController');

const router = express.Router();

// Validation for creating log
const createLogValidation = [
  body('problemId').notEmpty().withMessage('problemId is required'),
  body('status')
    .isIn(['attempted', 'solved', 'revision'])
    .withMessage('Status must be attempted, solved, or revision'),
];

router.post('/', auth, createLogValidation, createLog);
router.get('/', auth, getLogs);
router.get('/history/:problemId', auth, getLogHistory);

module.exports = router;
