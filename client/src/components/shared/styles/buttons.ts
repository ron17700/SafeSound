import Button, { ButtonProps } from '@mui/material/Button';
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
}));

export const StyledPassiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  border: 'none',
  color: '#333333',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

export const ConfirmButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#8EAAB0',
  color: '#FFFFFF',
}));

export const AddRecordButton = styled(Button)(() => ({
  marginTop: '5px',
  backgroundColor: '#103A49',
}));

export const GoBackButton = styled(Button)(() => ({
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  marginRight: 'auto',
}));

export const CloseButton = styled(Button)(() => ({
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  marginLeft: '8px',
}));

export const SendButton = styled('button')(() => ({
  marginLeft: '8px',
  background: '#103A49',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
}));
