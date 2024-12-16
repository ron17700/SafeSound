import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/auth';

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
  return await axios.post(`${API_BASE_URL}/logout`, { refreshToken });
};

export const refreshToken = async (refreshToken: string) => {
  return await axios.post(`${API_BASE_URL}/refresh-token`, { refreshToken });
};
