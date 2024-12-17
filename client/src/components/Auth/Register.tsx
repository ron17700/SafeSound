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

export default function Register() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    setModalIsOpen(false);
  };
  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById(
      'confirmPassword'
    ) as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    profileImage: string
  ) => {
    try {
      const response = await register(
        email,
        password,
        firstName,
        lastName,
        profileImage
      );
      console.log('Registration successful:', response.data);
      alert('User registered successfully!');
    } catch (error: any) {
      console.error(
        'Error during registration:',
        error.response?.data || error.message
      );
      alert('Registration failed!');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString().trim() || '';
    const [firstName = '', lastName = ''] = name.split(' ').filter(Boolean);
    const profileImage = imagePreview ? imagePreview : '';
    try {
      await handleRegister(
        data.get('email') as string,
        data.get('password') as string,
        firstName,
        lastName,
        profileImage
      );

      navigate('/');
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
                <FormLabel htmlFor="name">Full name</FormLabel>
                <StyledTextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
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
}
