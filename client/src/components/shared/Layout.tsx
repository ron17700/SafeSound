import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AlbumIcon from '@mui/icons-material/Album';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import { StyledAppbar, StyledDrawer } from './styles/layout';
import { BoxWrapper } from './styles/wrappers';
import { logout } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  type MenuItemType = 'MY_RECORDS' | 'SHARED_WITH_ME' | 'MY_PROFILE' | 'LOGOUT';

  interface MenuItem {
    type: MenuItemType;
    text: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItem[] = [
    { type: 'MY_RECORDS', text: 'My Records', icon: <AlbumIcon /> },
    {
      type: 'SHARED_WITH_ME',
      text: 'Shared With Me',
      icon: <MailOutlineIcon />,
    },
    { type: 'MY_PROFILE', text: 'My Profile', icon: <PersonIcon /> },
    { type: 'LOGOUT', text: 'Logout', icon: <LogoutIcon /> },
  ];

  const handleLogout = async (refreshToken: string) => {
    try {
      const response = await logout(refreshToken);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('User logged out successfully!');
    } catch (error: any) {
      console.error(
        'Error during logout:',
        error.response?.data || error.message
      );
      alert('Logout failed!');
    }
  };
  const onLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      handleLogout(refreshToken);
    }

    navigate('/login');
  };

  const handleClickedItem = (itemType: MenuItemType) => {
    switch (itemType) {
      case 'MY_RECORDS':
        console.log('Navigating to My Records...');
        break;
      case 'SHARED_WITH_ME':
        console.log('Navigating to Shared With Me...');
        break;
      case 'MY_PROFILE':
        console.log('Navigating to My Profile...');
        break;
      case 'LOGOUT':
        onLogout();
        break;
      default:
        console.log('Unknown item clicked');
    }
  };

  return (
    <BoxWrapper>
      <StyledDrawer variant="permanent" anchor="left">
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => handleClickedItem(item.type)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </StyledDrawer>
      <StyledAppbar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Records
          </Typography>
        </Toolbar>
      </StyledAppbar>
    </BoxWrapper>
  );
};

export default Layout;
