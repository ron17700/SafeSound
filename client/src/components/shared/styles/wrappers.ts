import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { CSSProperties } from 'react';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

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

interface StyledUploadImageProps {
  isDragActive: boolean;
}

export const StyledUploadImage = styled('div')<StyledUploadImageProps>(
  ({ isDragActive }) => ({
    border: '2px dashed #cccccc',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: isDragActive ? '#f0f8ff' : '#f9f9f9',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
  })
);

export const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '82vh',
}));

export const ButtonsDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '15vw',
  alignItems: 'center',
  margin: 'auto',
}));

export const RecordsContainer = styled(Container)(() => ({
  textAlign: 'center',
  marginTop: '10vh',
}));

export const BoxWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const DialogWrapper = styled(Box)(() => ({
  backgroundColor: '#F2F2F2',
}));

export const PageWrapper = styled(Box)(() => ({
  marginLeft: '7vw',
  marginTop: '12vh',
  width: '70vw',
}));

export const PaddedBox = styled(Box)(() => ({
  padding: '16px',
  marginLeft: '7vw',
}));

export const ListWrapper = styled(Box)(() => ({
  paddingLeft: '16px',
  maxHeight: 'calc(100vh - 225px)',
  overflowY: 'auto',
  width: '70vw',
  marginLeft: '7vw',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}));

export const StyledContent: CSSProperties = {
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#F2F2F2',
};

export const StyledOverlay = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
};

export const StyledToolbar = styled(Toolbar)(() => ({
  padding: '0px !important',
}));
