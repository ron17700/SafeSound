import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AlbumIcon from '@mui/icons-material/Album';
import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';
import { StyledAppbar, StyledDrawer } from './styles/layout';
import { BoxWrapper, StyledToolbar } from './styles/wrappers';
import { logout } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { Logo } from './styles/images';
import { AppHeader } from './styles/inputs';
import { showSwal } from './Swal';
import { parseAccessTokenToPayload } from '../../logic/user';
import { API_BASE_URL } from '../../api/apiService';

const SafeSoundLogo = new URL(
  '../../assets/images/SafeSound.png',
  import.meta.url
).href;

const profileImagePath = parseAccessTokenToPayload(
  localStorage.getItem('accessToken') || ''
).profileImage;

const userImageUrl = `${API_BASE_URL}/${profileImagePath.replace(/\\/g, '/')}`;

const Layout: React.FC = () => {
  const navigate = useNavigate();

  type MenuItemType = 'MY_RECORDS' | 'PUBLIC_RECORDS' | 'MY_PROFILE' | 'LOGOUT';

  interface MenuItem {
    type: MenuItemType;
    text: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItem[] = [
    { type: 'MY_RECORDS', text: 'My Records', icon: <AlbumIcon /> },
    {
      type: 'PUBLIC_RECORDS',
      text: 'Public Records',
      icon: <ShareIcon />,
    },
    { type: 'MY_PROFILE', text: 'My Profile', icon: <PersonIcon /> },
    { type: 'LOGOUT', text: 'Logout', icon: <LogoutIcon /> },
  ];

  const handleLogout = async (refreshToken: string) => {
    try {
      await logout(refreshToken);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      showSwal('User logged out successfully!');
    } catch (error: any) {
      console.error(
        'Error during logout:',
        error.response?.data || error.message
      );
      showSwal('Logout failed!', 'error');
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
        navigate('/records');
        break;
      case 'PUBLIC_RECORDS':
        navigate('/records/public');
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
        <StyledToolbar>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Logo src={SafeSoundLogo} alt="SafeSound Logo" />
              <AppHeader variant="h5" component="div" sx={{ flexGrow: 1 }}>
                SafeSound
              </AppHeader>
            </div>
            <img
              crossOrigin="anonymous"
              src={userImageUrl}
              alt="user image"
              style={{
                width: '50px',
                borderRadius: '50%',
                border: '1px solid #103A49',
                marginRight: '1vw',
              }}
            />
          </div>
        </StyledToolbar>
      </StyledAppbar>
    </BoxWrapper>
  );
};

export default Layout;
