// src/controllers/problemController.js
const { validationResult } = require('express-validator');
const Problem = require('../models/Problems');

// Helper: base query for listing problems
// For now: user sees own problems + public ones
const buildBaseQuery = (userId) => {
  return {
    $or: [
      { createdBy: userId },
      { isPublic: true }
    ],
    isArchived: false,
  };
};

// @desc   Create a new problem
// @route  POST /api/v1/problems
// @access Protected
const createProblem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: errors.array(),
      });
    }

    const { title, platform, url, difficulty, topics, isPublic } = req.body;

    // Only admin can set isPublic = true
    const finalIsPublic = req.user.role === 'admin' ? !!isPublic : false;

    const problem = await Problem.create({
      title,
      platform,
      url,
      difficulty,
      topics: Array.isArray(topics) ? topics : [],
      createdBy: req.user.id,
      isPublic: finalIsPublic,
    });

    res.status(201).json({ problem });
  } catch (err) {
    next(err);
  }
};

// @desc   Get list of problems (with filters & pagination)
// @route  GET /api/v1/problems
// @access Protected
const getProblems = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      difficulty,
      platform,
      topic,
      search,
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = buildBaseQuery(userId);

    // Filtering
    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (platform) {
      query.platform = platform;
    }

    if (topic) {
      // topic is a single string, topics is an array → match if topics contains topic
      query.topics = topic;
    }

    // Search by title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sort]: sortOrder };

    const [problems, totalCount] = await Promise.all([
      Problem.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum),
      Problem.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      data: problems,
      page: pageNum,
      limit: limitNum,
      totalPages,
      totalCount,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single problem by id
// @route  GET /api/v1/problems/:id
// @access Protected
const getProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem || problem.isArchived) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Only owner or admin can view non-public problem
    if (
      !problem.isPublic &&
      problem.createdBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Forbidden: Not allowed to view this problem' });
    }

    res.status(200).json({ problem });
  } catch (err) {
    next(err);
  }
};

// @desc   Update problem
// @route  PATCH /api/v1/problems/:id
// @access Protected (owner or admin)
const updateProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem || problem.isArchived) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const isOwner = problem.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Not allowed to update this problem' });
    }

    const { title, platform, url, difficulty, topics, isPublic } = req.body;

    if (title !== undefined) problem.title = title;
    if (platform !== undefined) problem.platform = platform;
    if (url !== undefined) problem.url = url;
    if (difficulty !== undefined) problem.difficulty = difficulty;
    if (topics !== undefined) problem.topics = Array.isArray(topics) ? topics : problem.topics;

    // Only admin can change isPublic
    if (isPublic !== undefined && isAdmin) {
      problem.isPublic = !!isPublic;
    }

    await problem.save();

    res.status(200).json({ problem });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete problem (soft delete optional)
// @route  DELETE /api/v1/problems/:id
// @access Protected (owner or admin)
const deleteProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem || problem.isArchived) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const isOwner = problem.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Not allowed to delete this problem' });
    }

    // Soft delete
    problem.isArchived = true;
    await problem.save();

    res.status(200).json({ message: 'Problem deleted (archived)' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};
