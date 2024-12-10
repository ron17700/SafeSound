import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  height: '80vh',
  backgroundColor: '#F2F2F2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(() => ({
  backgroundColor: '#C3CECD',
  height: '100vh',
  width: '100vw',
}));

const StyledActiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#79747E',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: theme.palette.grey[600], // Optional hover effect
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  width: '100%', // Ensures the button takes full width as in your original code
}));

const StyledPassiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  border: 'none',
  color: '#000000', // Black text color
  '&:hover': {
    backgroundColor: theme.palette.grey[200], // Optional hover effect
  },
}));

const StyledTextField = styled(TextField)(() => ({
  backgroundColor: 'white',
}));

export default function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
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
              />
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledActiveButton
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Log in
            </StyledActiveButton>
            <Divider>or</Divider>
            <Link to="/register">
              <StyledPassiveButton fullWidth variant="outlined">
                Sign up
              </StyledPassiveButton>
            </Link>
          </Box>
        </Box>
      </Card>
    </SignInContainer>
  );
}
