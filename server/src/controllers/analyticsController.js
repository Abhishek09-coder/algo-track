// src/controllers/analyticsController.js
const mongoose = require('mongoose');
const PracticeLog = require('../models/PracticeLog');

const getHeatmap = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const heatmap = await PracticeLog.aggregate([
      {
        $match: {
          userId,
          status: 'solved',
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
    ]);

    res.status(200).json({ heatmap });
  } catch (err) {
    next(err);
  }
};

const getDifficultyStats = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const result = await PracticeLog.aggregate([
      {
        $match: {
          userId,
          status: 'solved',
        },
      },
      {
        $group: {
          _id: '$problemId',
        },
      },
      {
        $lookup: {
          from: 'problems',
          localField: '_id',
          foreignField: '_id',
          as: 'problem',
        },
      },
      { $unwind: '$problem' },
      {
        $group: {
          _id: '$problem.difficulty',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          difficulty: '$_id',
          count: 1,
        },
      },
    ]);

    const stats = { easy: 0, medium: 0, hard: 0 };

    result.forEach((item) => {
      stats[item.difficulty.toLowerCase()] = item.count;
    });

    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

const getTopicStats = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const data = await PracticeLog.aggregate([
      {
        $match: {
          userId,
          status: { $in: ["solved", "attempted"] }
        }
      },
      {
        $group: {
          _id: {
            problemId: "$problemId",
            status: "$status"
          }
        }
      },
      {
        $lookup: {
          from: "problems",
          localField: "_id.problemId",
          foreignField: "_id",
          as: "problem"
        }
      },
      { $unwind: "$problem" },
      { $unwind: "$problem.topics" },
      {
        $group: {
          _id: {
            topic: "$problem.topics",
            status: "$_id.status"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // reshape response
    const result = {};

    data.forEach(item => {
      const topic = item._id.topic;
      const status = item._id.status;

      if (!result[topic]) {
        result[topic] = { solved: 0, attempted: 0 };
      }

      result[topic][status] = item.count;
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getWeakTopics = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const data = await PracticeLog.aggregate([
      {
        $match: {
          userId,
          status: { $in: ["solved", "attempted"] }
        }
      },
      {
        $group: {
          _id: {
            problemId: "$problemId",
            status: "$status"
          }
        }
      },
      {
        $lookup: {
          from: "problems",
          localField: "_id.problemId",
          foreignField: "_id",
          as: "problem"
        }
      },
      { $unwind: "$problem" },
      { $unwind: "$problem.topics" },
      {
        $group: {
          _id: {
            topic: "$problem.topics",
            status: "$_id.status"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    const topicStats = {};

    data.forEach(item => {
      const topic = item._id.topic;
      const status = item._id.status;

      if (!topicStats[topic]) {
        topicStats[topic] = { solved: 0, attempted: 0 };
      }

      topicStats[topic][status] = item.count;
    });

    const weakTopics = [];

    for (const topic in topicStats) {
      const { solved, attempted } = topicStats[topic];

      if (solved === 0 && attempted > 0) {
        weakTopics.push({
          topic,
          solved,
          attempted,
          strength: "very-weak"
        });
      } else if (attempted > solved) {
        weakTopics.push({
          topic,
          solved,
          attempted,
          strength: "weak"
        });
      }
    }

    res.status(200).json({ weakTopics });
  } catch (err) {
    next(err);
  }
};

const getRevisionRecommendations = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const data = await PracticeLog.aggregate([
      {
        $match: {
          userId,
          status: { $in: ["solved", "attempted"] }
        }
      },
      {
        $group: {
          _id: {
            problemId: "$problemId",
            status: "$status"
          }
        }
      },
      {
        $lookup: {
          from: "problems",
          localField: "_id.problemId",
          foreignField: "_id",
          as: "problem"
        }
      },
      { $unwind: "$problem" },
      { $unwind: "$problem.topics" },
      {
        $group: {
          _id: {
            topic: "$problem.topics",
            status: "$_id.status"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    const topicStats = {};

    data.forEach(item => {
      const topic = item._id.topic;
      const status = item._id.status;

      if (!topicStats[topic]) {
        topicStats[topic] = { solved: 0, attempted: 0 };
      }

      topicStats[topic][status] = item.count;
    });

    const recommendations = [];

    for (const topic in topicStats) {
      const { solved, attempted } = topicStats[topic];

      if (solved === 0 && attempted > 0) {
        recommendations.push({
          topic,
          priority: "very-high",
          reason: "No solved problems yet",
          suggestion: "Start with 1 easy problem"
        });
      } else if (attempted > solved) {
        recommendations.push({
          topic,
          priority: "high",
          reason: "More attempts than solves",
          suggestion: "Solve 2 medium problems"
        });
      }
    }

    res.status(200).json({ recommendations });
  } catch (err) {
    next(err);
  }
};

module.exports = { getHeatmap , getDifficultyStats , getTopicStats, getWeakTopics, getRevisionRecommendations};
