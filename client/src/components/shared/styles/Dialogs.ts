import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    width: '30vw',
  },
}));
