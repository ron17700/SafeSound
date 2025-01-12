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
    marginTop: '5px',
    marginBottom: '5px',
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
  width: '65vw',
}));

export const PaddedBox = styled(Box)(() => ({
  padding: '16px',
  marginLeft: '7vw',
}));

export const ListWrapper = styled(Box)(() => ({
  paddingLeft: '16px',
  maxHeight: 'calc(100vh - 225px)',
  overflowY: 'auto',
  width: '65vw',
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

export const MessageDateWrapper = styled('div')(() => ({
  textAlign: 'center',
  fontSize: '12px',
  marginBottom: '8px',
  color: '#888',
  borderBottom: '1px solid #ddd',
}));

export const ChatHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#4A969D',
  color: '#fff',
  padding: '10px',
  fontWeight: 'bold',
  textAlign: 'center',
}));

export const ChatBody = styled(Box)(() => ({
  flex: 1,
  padding: '10px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
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

export const ChatFooter = styled('div')(() => ({
  display: 'flex',
  borderTop: '1px solid #ddd',
  padding: '10px',
}));

export const MessageTimestamp = styled('small')(() => ({
  fontSize: '10px',
  display: 'block',
  textAlign: 'right',
}));

export const ChatWrapper = styled('div')(() => ({
  position: 'fixed',
  bottom: '90px',
  right: '20px',
  width: '400px',
  height: '50vh',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 10,
}));

export const MessageWrapper = styled('div')<{
  isCurrentUser: boolean;
}>(({ isCurrentUser }) => ({
  display: 'flex',
  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
  marginBottom: '5px',
}));

export const MessageContentWrapper = styled('div')<{
  isCurrentUser: boolean;
}>(({ isCurrentUser }) => ({
  background: isCurrentUser ? '#103A49' : '#F0F0F0',
  color: isCurrentUser ? '#fff' : '#000',
  borderRadius: '12px',
  padding: '8px 12px',
  maxWidth: '70%',
  wordWrap: 'break-word',
}));

export const MessageText = styled('p')(() => ({
  margin: 0,
}));

export const UsersContainer = styled(Box)(() => ({
  padding: '16px',
  overflowY: 'auto',
  height: '70vh',
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

export const ProfileContainer = styled(Box)(() => ({
  padding: '16px',
  paddingTop: '10vh',
  margin: 'auto',
}));

export const ImagePreviewContainer = styled(Box)(() => ({
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const UserListModal = styled(Box)(() => ({
  backgroundColor: 'white',
  padding: '16px',
  margin: 'auto',
  borderRadius: '8px',
  width: '50vw',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));


export const SummaryWrapper = styled('div')(() => ({
  height: '8vh',
  border: '1px solid #ddd',
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  overflow: 'auto',
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