import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  StyledHeader,
  StyledText,
  StyledTextField,
} from '../shared/styles/inputs';
import {
  ConfirmButton,
  StyledActiveButton,
  StyledPassiveButton,
} from '../shared/styles/buttons';
import {
  ButtonsDiv,
  StackContainer,
  StyledBox,
  StyledContent,
  StyledDiv,
  StyledOverlay,
  StyledUploadImage,
} from '../shared/styles/wrappers';
import { Card } from '../shared/styles/cards';
import { register } from '../../api/authApi';
import { useDropzone } from 'react-dropzone';
import { StyledForm } from '../shared/styles/forms';
import Modal from 'react-modal';
import { StyledImage, UploadedImage } from '../shared/styles/images';
import { showSwal } from '../shared/Swal';

const Register: React.FC = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file); // Save the file for submission
      setModalIsOpen(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const confirmImage = () => setModalIsOpen(false);
  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null); // Clear the file
    setModalIsOpen(false);
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById(
      'confirmPassword'
    ) as HTMLInputElement;
    const userName = document.getElementById('userName') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (confirmPassword.value !== password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    if (!userName.value || userName.value.length < 3) {
      setUserNameError(true);
      setUserNameErrorMessage('User Name must be at least 3 characters long.');
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameErrorMessage('');
    }

    return isValid;
  };

  const handleRegister = async (formData: FormData) => {
    try {
      await register(formData); // Pass the FormData directly
      showSwal('User registered successfully!');
    } catch (error: any) {
      console.error(
        'Error during registration:',
        error.response?.data || error.message
      );
      showSwal('Registration failed!', 'error');
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    const data = new FormData(event.currentTarget);

    // Append the image file to the FormData
    if (imageFile) {
      data.append('file', imageFile);
    }

    try {
      await handleRegister(data); // Send FormData to the backend
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <StackContainer>
      <Card variant="outlined">
        <StyledHeader component="h1" variant="h4">
          Create Account
        </StyledHeader>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <StyledDiv>
            <StyledBox>
              <FormControl>
                <FormLabel htmlFor="userName">User Name</FormLabel>
                <StyledTextField
                  autoComplete="username"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  placeholder="your_unique_name"
                  error={userNameError}
                  helperText={userNameErrorMessage}
                  color={userNameError ? 'error' : 'primary'}
                  size="small"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <StyledTextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? 'error' : 'primary'}
                  size="small"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <StyledTextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  size="small"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <StyledTextField
                  required
                  fullWidth
                  name="confirmPassword"
                  placeholder="••••••"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  variant="outlined"
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  color={confirmPasswordError ? 'error' : 'primary'}
                  size="small"
                />
              </FormControl>
              <StyledUploadImage
                {...getRootProps()}
                isDragActive={isDragActive}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <UploadedImage src={imagePreview} alt="Preview" />
                ) : (
                  <StyledText>
                    Drag & drop an image here, or click to upload
                  </StyledText>
                )}
              </StyledUploadImage>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                appElement={document.getElementById('root') || undefined}
                style={{
                  overlay: StyledOverlay,
                  content: StyledContent,
                }}
              >
                <StyledHeader>Image Preview</StyledHeader>
                {imagePreview && (
                  <StyledImage src={imagePreview} alt="Preview" />
                )}
                <ButtonsDiv>
                  <ConfirmButton onClick={confirmImage}>Confirm</ConfirmButton>
                  <StyledActiveButton onClick={removeImage}>
                    Remove
                  </StyledActiveButton>
                </ButtonsDiv>
              </Modal>
            </StyledBox>
            <StyledBox>
              <StyledActiveButton type="submit" fullWidth variant="contained">
                Sign up
              </StyledActiveButton>
              <Divider>or</Divider>
              <Link to="/">
                <StyledPassiveButton fullWidth variant="outlined">
                  Log in
                </StyledPassiveButton>
              </Link>
            </StyledBox>
          </StyledDiv>
        </StyledForm>
      </Card>
    </StackContainer>
  );
};

export default Register;
