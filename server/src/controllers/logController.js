// src/controllers/logController.js
const { validationResult } = require('express-validator');
const PracticeLog = require('../models/PracticeLog');


// @desc   Create a new practice log
// @route  POST /api/v1/logs
// @access Protected
const createLog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: errors.array(),
      });
    }

    const { problemId, status, timeSpent, notes } = req.body;

    // Count previous attempts for this user and problem
    const previousLogs = await PracticeLog.countDocuments({
      userId: req.user.id,
      problemId,
    });

    const newAttemptNumber = previousLogs + 1;

    const log = await PracticeLog.create({
      userId: req.user.id,
      problemId,
      status,
      timeSpent,
      notes,
      attemptNumber: newAttemptNumber,
    });

    res.status(201).json({ log });
  } catch (err) {
    next(err);
  }
};


// @desc   Get practice logs with filters
// @route  GET /api/v1/logs
// @access Protected
const getLogs = async (req, res, next) => {
  try {
    const { problemId, status, start, end } = req.query;

    const query = { userId: req.user.id };

    if (problemId) query.problemId = problemId;
    if (status) query.status = status;

    if (start && end) {
      query.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const logs = await PracticeLog.find(query).sort({ createdAt: -1 });

    res.status(200).json({ logs });
  } catch (err) {
    next(err);
  }
};


// @desc   Get attempt history for a problem
// @route  GET /api/v1/logs/history/:problemId
// @access Protected
const getLogHistory = async (req, res, next) => {
  try {
    const problemId = req.params.problemId;

    const logs = await PracticeLog.find({
      userId: req.user.id,
      problemId,
    }).sort({ attemptNumber: 1 });

    res.status(200).json({ history: logs });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createLog,
  getLogs,
  getLogHistory,
};
