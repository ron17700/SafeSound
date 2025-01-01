export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  profileImage: string;
  iat: string;
  exp: string;
}

export const parseAccessTokenToPayload = (
  accessToken: string
): TokenPayload => {
  try {
    if (!accessToken) throw new Error('Access token is empty');

    const parts = accessToken.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');

    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));

    const parsedPayload: TokenPayload = JSON.parse(payload);

    if (
      !parsedPayload.userId ||
      !parsedPayload.email ||
      !parsedPayload.role ||
      !parsedPayload.profileImage ||
      !parsedPayload.iat ||
      !parsedPayload.exp
    ) {
      throw new Error('Missing required fields in token payload');
    }

    return parsedPayload;
  } catch (error) {
    console.error('Failed to parse token payload:', error);

    return {
      userId: '',
      email: '',
      role: '',
      profileImage: '',
      iat: '',
      exp: '',
    };
  }
};
