import { keyframes } from '@emotion/react';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const InProgressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      animation: `${spin} 2s linear infinite`,
      transformOrigin: 'center',
    }}
  >
    <path
      fill="#2196F3" // Tint color similar to your Android vector
      d="M12 4a8 8 0 1 0 8 8h-2a6 6 0 1 1 -6 -6V4z"
    />
  </svg>
);
