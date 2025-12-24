// src/routes/problemRoutes.js
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} = require('../controllers/problemController');

const router = express.Router();

// Validation rules
const createProblemValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),
  body('platform')
    .optional()
    .isIn(['LeetCode', 'GFG', 'CodeStudio', 'Codeforces', 'Other'])
    .withMessage('Invalid platform'),
  body('topics')
    .optional()
    .isArray()
    .withMessage('Topics must be an array of strings'),
];

// Routes
router.post('/', auth, createProblemValidation, createProblem);
router.get('/', auth, getProblems);
router.get('/:id', auth, getProblemById);
router.patch('/:id', auth, updateProblem);
router.delete('/:id', auth, deleteProblem);

module.exports = router;
