import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FFFF00' },
    secondary: { main: '#b90EE90' },
    mode: 'light',
    background: { default: '#90EE90' },
    text: {
      primary: '#222',
    },
  },
});

export { theme };
