import api from './api';

export const fetchWardenHostel = async () => {
  try {
    const response = await api.get('/api/warden/hostel');
    return response.data;
  } catch (error) {
    console.error('Error fetching warden hostel:', error);
    throw error;
  }
};

export const fetchOutpasses = async (hostel) => {
  try {
    const response = await api.get(`/api/outpasses?hostel=${hostel}&status=pending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching outpasses:', error);
    throw error;
  }
};
