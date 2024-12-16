import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const StackContainer = styled(Stack)(() => ({
  backgroundColor: '#C3CECD',
  height: '100vh',
  width: '100vw',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '75vh',
}));
