import api from './axios';

export const getProblems = async () => {
  const res = await api.get('/problems');
  return res.data;
};

export const createProblem = async (payload) => {
  const res = await api.post('/problems', payload);
  return res.data;
};

export const deleteProblem = async (id) => {
  const res = await api.delete(`/problems/${id}`);
  return res.data;
};

