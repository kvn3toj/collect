import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#006A4E', // Verde esmeralda principal
    },
    secondary: {
      main: '#bfa05a', // Dorado de acento
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0A0A0',
    },
    divider: 'rgba(191, 160, 90, 0.3)',
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h5: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body1: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 300,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
    subtitle1: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
    },
    subtitle2: {
      fontFamily: 'Times New Roman, serif',
      fontWeight: 'bold',
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[6],
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 24px',
        },
        containedPrimary: {
          color: '#ffffff',
        },
        containedSecondary: {
          color: '#000000',
        },
      },
    },
  },
});

export default theme; 