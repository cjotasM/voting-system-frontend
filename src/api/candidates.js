import { axiosPrivate } from './axios.config';

export const getCandidates = async (page = 1, limit = 10) => {
  const response = await axiosPrivate.get(`/candidates?page=${page}&limit=${limit}`);
  return response.data;
};

export const getCandidateById = async (id) => {
  const response = await axiosPrivate.get(`/candidates/${id}`);
  return response.data;
};

export const createCandidate = async (candidateData) => {
  const response = await axiosPrivate.post('/candidates', candidateData);
  return response.data;
};

export const deleteCandidate = async (id) => {
  const response = await axiosPrivate.delete(`/candidates/${id}`);
  return response.data;
};

