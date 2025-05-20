'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#2D9ACF',
      light: '#6EC1E4',
      dark: '#1E7EBB',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6B2D',
      light: '#FF8A50',
      dark: '#C63E10',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5FCFF',
      paper: '#E8F7FC',
    },
    text: {
      primary: '#1E2A38',
      secondary: '#4B5A6B',
    },
  },
});

export default theme;
