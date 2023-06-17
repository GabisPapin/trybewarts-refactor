import { createTheme } from '@mui/material';
import { green, cyan } from '@mui/material/colors';

const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green[400],
      dark: green[600],
      light: green[200],
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
});

export default LightTheme;
