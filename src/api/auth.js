import { axiosPublic } from './axios.config';

export const loginUser = async (credentials) => {
  const response = await axiosPublic.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosPublic.post('/auth/register', userData);
  return response.data;
};