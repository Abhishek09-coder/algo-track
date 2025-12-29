// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// Helper: format user info for response (never send passwordHash)
const buildUserResponse = (user, token) => {
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
};

// @desc   Register new user
// @route  POST /api/v1/auth/register
// @access Public
const register = async (req, res, next) => {
  try {
    // 1) Validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // 2) Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    // 3) Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4) Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role
    });

    // 5) Generate JWT
    const token = generateToken(user._id, user.role);

    // 6) Send response
    return res.status(201).json(buildUserResponse(user, token));
  } catch (err) {
    next(err);
  }
};

// @desc   Login user
// @route  POST /api/v1/auth/login
// @access Public
const login = async (req, res, next) => {
  try {
    // 1) Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // 2) Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    // 3) Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    // 4) Generate JWT
    const token = generateToken(user._id, user.role);

    // 5) Send response
    return res.status(200).json(buildUserResponse(user, token));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
