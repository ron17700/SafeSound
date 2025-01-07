import axios from 'axios';
import api, { API_BASE_URL } from './apiService';

export const register = async (formData: FormData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, formData);
};

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
};

export const loginWithGoogle = async () => {
  window.open(`${API_BASE_URL}/auth/login/google`, "_self");
};

export const logout = async (refreshToken: string) => {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/logout`, {
      refreshToken,
    });
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
  return await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
    refreshToken,
  });
};
