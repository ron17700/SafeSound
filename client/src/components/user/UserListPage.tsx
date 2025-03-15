import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import api, { API_BASE_URL } from '../../api/apiService';
import { socket } from '../../utils/socket';
import { UserProfile } from './UserProfilePage';
import { UsersContainer } from '../shared/styles/wrappers';
import { UserImage } from '../shared/styles/images';
import { UserCard } from '../shared/styles/cards';

const UserListPage: React.FC<{
  onSelectUser: (chatId: string, userName: string) => void;
}> = ({ onSelectUser }) => {
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

  const handleStartChat = (targetUserId: string, targetUserName: string) => {
    socket.emit('joinChat', {
      userId: localStorage.getItem('userId'),
      targetUserId,
    });

    socket.once('chatJoined', ({ chatId }) => {
      onSelectUser(chatId, targetUserName);
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <UsersContainer>
      <Typography variant="h6" marginBottom={2}>
        Choose a user to chat with:
      </Typography>
      {users.length === 0 ? (
        <Typography>No other users available for chat.</Typography>
      ) : (
        users.map((user) => (
          <UserCard
            key={user._id}
            onClick={() => handleStartChat(user._id, user.userName)}
          >
            <UserImage
              crossOrigin="anonymous"
              src={`${API_BASE_URL}/${(user.profileImage || '').replace(
                /\\/g,
                '/'
              )}`}
              alt="User Profile"
            />
            <Typography>{user.userName}</Typography>
          </UserCard>
        ))
      )}
    </UsersContainer>
  );
};

export default UserListPage;
