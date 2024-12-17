import { styled } from '@mui/material/styles';

export const StyledImage = styled('img')(() => ({
  maxWidth: '100%',
  maxHeight: '50vh',
  marginBottom: '5vh',
  marginTop: '5vh',
}));

export const UploadedImage = styled('img')(() => ({
  maxWidth: '20vw',
  maxHeight: '10vh',
  margin: 'auto',
}));
