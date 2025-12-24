// src/middleware/roleMiddleware.js

const adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Forbidden: Admin access required',
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong in role middleware' });
  }
};

module.exports = { adminOnly };
