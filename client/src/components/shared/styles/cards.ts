import { CardContent } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme }) => ({
  height: '90vh',
  backgroundColor: '#F2F2F2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignSelf: 'center',
  width: '33vw',
  maxWidth: '500px',
  padding: theme.spacing(2),
  margin: 'auto',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
}));

export const ChunkDetailsCard = styled(MuiCard)(() => ({
  padding: '10px',
  paddingBottom: '3vh',
  height: '30vh',
}));

export const CommentsCard = styled(MuiCard)(() => ({
  padding: '10px',
  height: '47vh',
  marginTop: '2vh',
  paddingBottom: '0vh',
}));

export const UserCard = styled(MuiCard)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '16px',
}));

export const ProfileCard = styled(MuiCard)(() => ({
  padding: '20px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2vh',
  height: '70vh',
  width: '65vw',
  position: 'relative',
  paddingBottom: '80px',
}));

export const ChunkContent = styled(CardContent)(() => ({
  height: '29vh',
  overflowY: 'auto',
  padding: '2px',
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

export const CommentsContent = styled(CardContent)(() => ({
  height: '43vh',
  overflowY: 'auto',
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
