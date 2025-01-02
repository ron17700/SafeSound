import { getRefreshToken } from './authApi';

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const response = await getRefreshToken(refreshToken);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Unable to refresh access token');
    }
  } else {
    return null;
  }
};
