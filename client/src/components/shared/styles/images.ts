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

export const RecordsImage = styled('img')(() => ({
  width: '20%',
  height: '20%',
  marginBottom: 2,
  alignSelf: 'center',
}));

export const Logo = styled('img')(() => ({
  width: '5%',
  height: '5%',
  alignSelf: 'center',
}));

export const UserImage = styled('img')(() => ({
  marginRight: '16px',
  height: '50px',
}));

export const ProfileImage = styled('img')(() => ({
  width: 150,
  height: 150,
  marginBottom: 2,
}));

export const GoogleIcon = styled('img')(() => ({
  width: 20,
  height: 20,
}));
