import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const StyledDrawer = styled(Drawer)(() => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5',
  },
}));

export const StyledAppbar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#4A969D',
}));
