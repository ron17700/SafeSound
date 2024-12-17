import axios from 'axios';
import api, { API_BASE_URL } from './apiService';

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  profileImage: string
) => {
  return axios.post(`${API_BASE_URL}/register`, {
    email,
    password,
    firstName,
    lastName,
    profileImage,
  });
};

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
};

export const logout = async (refreshToken: string) => {
  try {
    const response = await api.post(`${API_BASE_URL}/logout`, { refreshToken });
    return response;
  } catch (error: any) {
    console.error(
      'Error during logout:',
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getRefreshToken = async (refreshToken: string) => {
  return await axios.post(`${API_BASE_URL}/refresh-token`, { refreshToken });
};
