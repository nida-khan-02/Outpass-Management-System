import axios from 'axios';

const API_URL = 'https://outpass-management-system-backend.vercel.app/api/outpass';

const apply = async (details) => {
  const response = await axios.post(`${API_URL}/apply`, details);
  return response.data;
};

const getOutpassesForStudent = async (studentId) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`);
  return response.data;
};

const getOutpassesForWarden = async (wardenId) => {
  const response = await axios.get(`${API_URL}/warden/${wardenId}`);
  return response.data;
};

export default { apply, getOutpassesForStudent, getOutpassesForWarden };
