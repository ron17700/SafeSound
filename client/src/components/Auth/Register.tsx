import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import { StyledHeader, StyledTextField } from '../shared/styles/inputs';
import {
  StyledActiveButton,
  StyledPassiveButton,
} from '../shared/styles/buttons';
import {
  StackContainer,
  StyledBox,
  StyledDiv,
} from '../shared/styles/wrappers';
import { Card } from '../shared/styles/cards';
import { register } from '../../api/authApi';

export default function Register() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const navigate = useNavigate();

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
    lastName: string
  ) => {
    try {
      const response = await register(email, password, firstName, lastName, '');
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

    try {
      await handleRegister(
        data.get('email') as string,
        data.get('password') as string,
        firstName,
        lastName
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
        <form onSubmit={handleSubmit} noValidate>
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
            </StyledBox>
            <StyledBox>
              <StyledActiveButton type="submit" fullWidth variant="contained">
                Sign up
              </StyledActiveButton>
              <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
              </Divider>
              <Link to="/">
                <StyledPassiveButton fullWidth variant="outlined">
                  Log in
                </StyledPassiveButton>
              </Link>
            </StyledBox>
          </StyledDiv>
        </form>
      </Card>
    </StackContainer>
  );
}
