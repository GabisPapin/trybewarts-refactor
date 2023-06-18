import { createTheme } from '@mui/material';
import { green, cyan } from '@mui/material/colors';

const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green[500],
      dark: green[600],
      light: green[300],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'fantasy',
    },
  },
});

export default LightTheme;
