import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledActiveButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#79747E',
  borderColor: '#ddd',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: theme.palette.grey[600],
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const SmallActiveButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#79747E',
  borderColor: '#ddd',
  color: '#FFFFFF',
  fontSize: '12px',
  padding: '2px 5px',
  '&:hover': {
    backgroundColor: theme.palette.grey[600],
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const StyledPassiveButton = styled(Button)(() => ({
  backgroundColor: 'white',
  border: 'none',
  color: '#555',
}));

export const StyledGoogleLoginButton = styled(Button)(() => ({
  backgroundColor: 'white',
  border: 'none',
  color: '#555',
  borderColor: '#ddd',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '16px',
  padding: '10px 20px',
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

export const UpdateButton = styled(AddRecordButton)(() => ({
  marginTop: '16px',
  width: '25vw',
}));

export const ChatButton = styled(ConfirmButton)(() => ({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#4A969D',
  padding: '10px 20px',
}));

export const StyledConfirmButton = styled(ConfirmButton)(() => ({
  marginBottom: '8px',
  width: '25vw',
  textAlign: 'center',
}));
