import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Card,
  Button,
  Modal,
} from '@mui/material';
import api, { API_BASE_URL } from '../../api/apiService';
import { showSwal } from '../shared/Swal';
import { StatusCodes } from 'http-status-codes';
import { AddRecordButton, ConfirmButton } from '../shared/styles/buttons';
import { StyledHeader } from '../shared/styles/inputs';
import { Chat } from '../chat/Chat';
import UserListPage from './UserListPage';

export interface UserProfile {
  _id: string;
  userName: string;
  email: string;
  profileImage?: string | null;
}

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatedUsername, setUpdatedUsername] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isUserListOpen, setIsUserListOpen] = useState(false);

  const userImageUrl = `${API_BASE_URL}/${(
    userProfile?.profileImage || ''
  ).replace(/\\/g, '/')}`;

  const handleUserSelect = (selectedChatId: string) => {
    setChatId(selectedChatId);
    setIsUserListOpen(false); // Close the modal after selecting a user
    setIsChatOpen(true); // Open the chat when a user is selected
  };

  const fetchUserProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await api.get(`/user/${userId}`);

      if (response.status === StatusCodes.OK) {
        setUserProfile(response.data);
        setUpdatedUsername(response.data.userName);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const formData = new FormData();
      if (updatedUsername) formData.append('userName', updatedUsername);
      if (selectedFile) formData.append('file', selectedFile);

      const response = await api.put(`/user/${userId}`, formData);

      if (response.status === StatusCodes.OK) {
        showSwal('Profile updated successfully!');

        setImagePreview(null);
        setUpdatedUsername('');

        await fetchUserProfile();
        window.dispatchEvent(new Event('storage'));
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const goBack = () => {
    setIsChatOpen(false);
    setIsUserListOpen(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!userProfile) {
    return <Typography>Error loading user profile</Typography>;
  }

  return (
    <Box padding="16px" paddingTop="10vh" margin={'auto'}>
      <Card
        style={{
          padding: '20px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2vh',
          height: '80vh',
          width: '70vw',
        }}
      >
        <img
          crossOrigin="anonymous"
          src={userImageUrl}
          alt="User Profile"
          style={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <Typography variant="h6">{userProfile.email}</Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          sx={{
            marginTop: 2,
            marginBottom: 2,
            width: '25vw',
          }}
        />
        <ConfirmButton
          variant="contained"
          component="label"
          sx={{ marginBottom: 1, width: '25vw', textAlign: 'center' }}
        >
          Upload Profile Picture
          <input type="file" hidden onChange={handleFileChange} />
        </ConfirmButton>
        {imagePreview && (
          <Box
            marginTop={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <StyledHeader variant="body1">Selected Image Preview:</StyledHeader>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 125,
                height: 125,
                objectFit: 'cover',
                borderRadius: '50%',
                marginTop: '1vh',
              }}
            />
          </Box>
        )}
        <AddRecordButton
          sx={{ marginTop: 2, width: '25vw' }}
          variant="contained"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </AddRecordButton>

        <Button variant="contained" onClick={() => setIsUserListOpen(true)}>
          Open Chat with Others
        </Button>
      </Card>

      <Modal open={isUserListOpen} onClose={() => setIsUserListOpen(false)}>
        <Box
          style={{
            backgroundColor: 'white',
            padding: '16px',
            margin: 'auto',
            marginTop: '10%',
            borderRadius: '8px',
            maxWidth: '500px',
          }}
        >
          <UserListPage onSelectUser={handleUserSelect} />
        </Box>
      </Modal>

      {isChatOpen && chatId && (
        <Chat chatId={chatId} onClose={closeChat} onGoBack={goBack} />
      )}
    </Box>
  );
};

export default UserProfilePage;
