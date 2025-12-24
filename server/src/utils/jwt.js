// src/utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (userId, role = 'user') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not defined');
  }

  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d', // 1 day (later we can change)
    }
  );
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not defined');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
