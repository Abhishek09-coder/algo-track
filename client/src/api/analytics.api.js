import api from './axios';

export const getDifficultyStats = async () => {
  const res = await api.get('/analytics/difficulty');
  return res.data;
};

export const getWeakTopics = async () => {
  const res = await api.get('/analytics/weak-topics');
  return res.data;
};

export const getHeatmap = async () => {
  const res = await api.get('/analytics/heatmap');
  return res.data;
};

export const getRecommendations = async () => {
  const res = await api.get('/analytics/recommendations');
  return res.data;
};