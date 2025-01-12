import * as React from 'react';

import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import {
  StyledActiveButton,
  StyledGoogleLoginButton,
  StyledPassiveButton,
} from '../shared/styles/buttons';
import { StyledHeader, StyledTextField } from '../shared/styles/inputs';
import {
  StackContainer,
  StyledBox,
  StyledDiv,
} from '../shared/styles/wrappers';
import { Card } from '../shared/styles/cards';
import { login, loginWithGoogle } from '../../api/authApi';
import { StyledForm } from '../shared/styles/forms';
import { showSwal } from '../shared/Swal';
import { parseAccessTokenToPayload } from '../../logic/user';
import { GoogleIcon } from '../shared/styles/images';

const GoogleLogo = new URL(
  '../../assets/images/googleLogo.png',
  import.meta.url
).href;

interface LoginProps {
  handleAccessToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleAccessToken }) => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem(
      'userId',
      parseAccessTokenToPayload(accessToken).userId
    );
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);

      saveTokens(response.data.accessToken, response.data.refreshToken);
      handleAccessToken(response.data.accessToken);

      showSwal('User logged in successfully!');
    } catch (error: any) {
      console.error(
        'Error during login:',
        error.response?.data || error.message
      );
      showSwal('Login failed!', 'error');
    }
  };

  const handleLoginWithGoogle = async (event) => {
    event.preventDefault();
    try {
      await loginWithGoogle();
    } catch (error: any) {
      console.error(
        'Error during login:',
        error.response?.data || error.message
      );
      showSwal('Login failed!', 'error');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    const data = new FormData(event.currentTarget);

    try {
      await handleLogin(
        data.get('email') as string,
        data.get('password') as string
      );

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

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

    return isValid;
  };

  return (
    <StackContainer>
      <Card variant="outlined">
        <StyledBox>
          <StyledHeader component="h1" variant="h4">
            Sign in
          </StyledHeader>
          <StyledForm onSubmit={handleSubmit} noValidate>
            <StyledDiv>
              <StyledBox>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <StyledTextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? 'error' : 'primary'}
                    size="small"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <StyledTextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={passwordError ? 'error' : 'primary'}
                    size="small"
                  />
                </FormControl>
              </StyledBox>
              <StyledBox>
                <StyledActiveButton
                  type="submit"
                  fullWidth
                  variant="outlined"
                  onClick={validateInputs}
                >
                  Log in
                </StyledActiveButton>
                <Divider>or</Divider>
                <StyledGoogleLoginButton
                  type="submit"
                  fullWidth
                  variant="outlined"
                  onClick={handleLoginWithGoogle}
                  startIcon={<GoogleIcon src={GoogleLogo} alt="Google Icon" />}
                >
                  Continue with Google
                </StyledGoogleLoginButton>
                <Divider>or</Divider>
                <Link to="/register">
                  <StyledPassiveButton fullWidth variant="outlined">
                    <span>Sign up</span>
                  </StyledPassiveButton>
                </Link>
              </StyledBox>
            </StyledDiv>
          </StyledForm>
        </StyledBox>
      </Card>
    </StackContainer>
  );
};

export default Login;
