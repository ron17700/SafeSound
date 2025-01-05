import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CircularProgress } from '@mui/material';
import api, { API_BASE_URL } from '../../api/apiService';
import { socket } from '../../utils/socket';
import { UserProfile } from './UserProfilePage';

const UserListPage: React.FC<{ onSelectUser: (chatId: string) => void }> = ({
  onSelectUser,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await api.get('/user');
      const otherUsers = response.data.filter(
        (user: UserProfile) => user._id !== userId
      );
      setUsers(otherUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStartChat = (targetUserId: string) => {
    socket.emit('joinChat', {
      userId: localStorage.getItem('userId'),
      targetUserId,
    });

    socket.once('chatJoined', ({ chatId }) => {
      onSelectUser(chatId);
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      padding="16px"
      sx={{
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
      }}
    >
      <Typography variant="h6" marginBottom={2}>
        Choose a user to chat with:
      </Typography>
      {users.length === 0 ? (
        <Typography>No other users available for chat.</Typography>
      ) : (
        users.map((user) => (
          <Card
            key={user._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '16px',
            }}
            onClick={() => handleStartChat(user._id)}
          >
            <img
              crossOrigin="anonymous"
              src={`${API_BASE_URL}/${(user.profileImage || '').replace(
                /\\/g,
                '/'
              )}`}
              alt="User Profile"
              style={{ marginRight: '16px', height: '50px' }}
            />
            <Typography>{user.userName}</Typography>
          </Card>
        ))
      )}
    </Box>
  );
};

export default UserListPage;
