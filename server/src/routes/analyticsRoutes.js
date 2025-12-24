// src/routes/analyticsRoutes.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getHeatmap , getDifficultyStats , getTopicStats, getWeakTopics , getRevisionRecommendations} = require('../controllers/analyticsController');

const router = express.Router();

// All analytics routes will be protected
router.get('/heatmap', auth, getHeatmap);
router.get('/difficulty', auth, getDifficultyStats);
router.get('/topics', auth, getTopicStats);
router.get('/weak-topics', auth, getWeakTopics);
router.get('/recommendations', auth, getRevisionRecommendations);

module.exports = router;
