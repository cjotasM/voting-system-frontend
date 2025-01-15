import { axiosPrivate } from './axios.config';

export const getVoters = async (page = 1, limit = 10) => {
  const response = await axiosPrivate.get(`/voters?page=${page}&limit=${limit}`);
  return response.data;
};

export const getVoterById = async (id) => {
  const response = await axiosPrivate.get(`/voters/${id}`);
  return response.data;
};

export const deleteVoter = async (id) => {
  const response = await axiosPrivate.delete(`/voters/${id}`);
  return response.data;
};