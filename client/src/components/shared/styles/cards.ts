import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme }) => ({
  height: '85vh',
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
