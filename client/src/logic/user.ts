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

    // Decode the payload (second part of the token)
    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));

    console.log('Token payload:', payload);

    // Parse the payload and return the object
    const parsedPayload: TokenPayload = JSON.parse(payload);

    // Ensure that the parsed payload has all required properties
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

    return parsedPayload; // Return the parsed payload with all required fields
  } catch (error) {
    console.error('Failed to parse token payload:', error);
    // Return default values in case of an error
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
