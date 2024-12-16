import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledActiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#79747E',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: theme.palette.grey[600],
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  width: '100%', 
}));

export const StyledPassiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  border: 'none',
  color: '#000000', // Black text color
  '&:hover': {
    backgroundColor: theme.palette.grey[200], 
  },
}));
