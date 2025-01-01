import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import api, { API_BASE_URL } from '../../api/apiService';
import { refreshAccessToken } from '../../api/apiLogic';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  profileImage?: string | null;
}

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Store user profile
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [updatedUsername, setUpdatedUsername] = useState<string>(''); // Updated username
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File to upload
  const [imagePreview, setImagePreview] = useState<string | null>(null); // To store image preview URL

  const userImageUrl = `${API_BASE_URL}/${(
    userProfile?.profileImage || ''
  ).replace(/\\/g, '/')}`;

  const fetchUserProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        setUserProfile(response.data);
        setUpdatedUsername(response.data.userName);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview to the file
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
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

      const response = await api.put(`/user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');


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

  // Show loading spinner while profile is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  // Handle case where the user profile couldn't be loaded
  if (!userProfile) {
    return <Typography>Error loading user profile</Typography>;
  }

  return (
    <Box
      padding="16px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={7}
    >
      <img
        crossOrigin="anonymous"
        src={userImageUrl}
        alt="User Profile"
        style={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h6">{userProfile.email}</Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={updatedUsername} // Display current username
        onChange={(e) => setUpdatedUsername(e.target.value)}
        sx={{ marginTop: 2, marginBottom: 2, width: '300px' }}
      />
      <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
        Upload Profile Picture
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {imagePreview && (
        <Box
          marginTop={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="body1">Selected Image Preview:</Typography>
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: 150,
              height: 150,
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateProfile}
        sx={{ width: '300px', marginTop: 2 }}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default UserProfilePage;
