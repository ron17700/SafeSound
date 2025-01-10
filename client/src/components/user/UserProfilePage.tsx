import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Modal,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import api, { API_BASE_URL } from '../../api/apiService';
import { showSwal } from '../shared/Swal';
import { StatusCodes } from 'http-status-codes';
import { ChatButton, StyledConfirmButton, UpdateButton } from '../shared/styles/buttons';
import { PreviewImage,  StyledUserTextField } from '../shared/styles/inputs';
import { Chat } from '../chat/Chat';
import UserListPage from './UserListPage';
import {refreshAccessToken} from "../../api/apiLogic";
import { ImagePreviewContainer, ProfileContainer, UserListModal } from '../shared/styles/wrappers';
import { ProfileCard } from '../shared/styles/cards';
import { ProfileImage } from '../shared/styles/images';

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

  const userImageUrl= userProfile?.profileImage?.startsWith('http') ? userProfile?.profileImage
      : (`${API_BASE_URL}/${(userProfile?.profileImage || '').replace(/\\/g, '/')}`)

  const handleUserSelect = (selectedChatId: string) => {
    setChatId(selectedChatId);
    setIsUserListOpen(false);
    setIsChatOpen(true);
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
        await refreshAccessToken();
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
    <ProfileContainer>
    <ProfileCard>
      <ProfileImage
        crossOrigin="anonymous"
        src={userImageUrl}
        alt="User Profile"
      />
      <Typography variant="h6">{userProfile.email}</Typography>
      <StyledUserTextField
        label="Username"
        variant="outlined"
        value={updatedUsername}
        onChange={(e) => setUpdatedUsername(e.target.value)}
      />
      <StyledConfirmButton component="label">
        Upload Profile Picture
        <input type="file" hidden onChange={handleFileChange} />
      </StyledConfirmButton>
      {imagePreview && (
        <ImagePreviewContainer>
          <Typography variant="body1">Selected Image Preview:</Typography>
          <PreviewImage src={imagePreview} alt="Preview" />
        </ImagePreviewContainer>
      )}
      <UpdateButton variant="contained" onClick={handleUpdateProfile}>
        Update Profile
      </UpdateButton>
      <ChatButton
        variant="contained"
        onClick={() => setIsUserListOpen(true)}
        startIcon={<ChatIcon />}
      >
        Open Chat with Others
      </ChatButton>
    </ProfileCard>

    <Modal open={isUserListOpen} onClose={() => setIsUserListOpen(false)}>
      <UserListModal>
        <UserListPage onSelectUser={handleUserSelect} />
      </UserListModal>
    </Modal>

    {isChatOpen && chatId && (
      <Chat chatId={chatId} onClose={closeChat} onGoBack={goBack} />
    )}
  </ProfileContainer>
  );
};

export default UserProfilePage;
