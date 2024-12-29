import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          userSelect: 'none',
        },
      },
    },
  },
});

export default theme;
