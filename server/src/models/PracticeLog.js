// src/models/PracticeLog.js
const mongoose = require('mongoose');

const practiceLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    status: {
      type: String,
      enum: ['attempted', 'solved', 'revision'],
      required: true,
    },
    timeSpent: {
      type: Number, // minutes
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const PracticeLog = mongoose.model('PracticeLog', practiceLogSchema);

module.exports = PracticeLog;
