import api from './axios';

export const createPracticeLog = async (payload) => {
  const res = await api.post('/logs', payload);
  return res.data;
};
