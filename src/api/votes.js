import { axiosPrivate } from './axios.config';

export const createVote = async (voteData) => {
  const response = await axiosPrivate.post('/votes', voteData);
  return response.data;
};

export const getAllVotes = async () => {
  const response = await axiosPrivate.get('/votes');
  return response.data;
};

export const getVotingStatistics = async () => {
  try {
    const response = await axiosPrivate.get('/votes/statistics');
    console.log('Response from API:', response.data); // Para debug
    return response.data;
  } catch (error) {
    console.error('Error in getVotingStatistics:', error);
    throw error;
  }
};