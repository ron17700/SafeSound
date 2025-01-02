import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const StyledTextField = styled(TextField)(() => ({
  backgroundColor: 'white',
  size: 'small',
}));

export const StyledHeader = styled(Typography)<TypographyProps>(() => ({
  width: '100%',
  color: '#333333',
  fontSize: 'clamp(1.5rem, 8vw, 1.8rem)',
}));

export const Loading = styled(Typography)<TypographyProps>(() => ({
  width: '100%',
  fontSize: 'clamp(1.5rem, 8vw, 1.8rem)',
  textAlign: 'center',
  color: '#103A49',
}));

export const StyledText = styled('p')(() => ({
  color: '#444444',
  fontSize: 'clamp(O.5rem, 4vw, 0.8rem)',
}));

export const AppHeader = styled(Typography)<TypographyProps>(() => ({
  width: '100%',
  fontSize: 'clamp(1.5rem, 8vw, 1.8rem)',
  fontWeight: 800,
  WebkitTextStroke: '1px #103A49',
  pointerEvents: 'none',
}));

export const StyledTitle = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: '1.8rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const PaddedTitle = styled(Typography)<TypographyProps>(() => ({
  marginTop: '20px',
}));
