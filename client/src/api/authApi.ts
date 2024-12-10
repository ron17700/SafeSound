import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This uses the proxy set in vite.config.ts
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: string;
}) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
