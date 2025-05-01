import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    emerald: Palette['primary'];
    gold: Palette['primary'];
  }
  interface PaletteOptions {
    emerald?: PaletteOptions['primary'];
    gold?: PaletteOptions['primary'];
  }
}

const luxuryTheme = createTheme({
  palette: {
    primary: {
      main: '#0B5D4C', // deep emerald green
      light: '#2A8C7A',
      dark: '#093C32',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D4AF37', // gold
      light: '#E6C766',
      dark: '#A68829',
      contrastText: '#000000',
    },
    emerald: {
      main: '#0B5D4C',
      light: '#2A8C7A',
      dark: '#093C32',
      contrastText: '#FFFFFF',
    },
    gold: {
      main: '#D4AF37',
      light: '#E6C766',
      dark: '#A68829',
      contrastText: '#000000',
    },
    error: {
      main: '#B71C1C',
      light: '#D32F2F',
      dark: '#7F0000',
    },
    warning: {
      main: '#F57C00',
      light: '#FFB74D',
      dark: '#E65100',
    },
    success: {
      main: '#388E3C',
      light: '#66BB6A',
      dark: '#1B5E20',
    },
    info: {
      main: '#0288D1',
      light: '#4FC3F7',
      dark: '#01579B',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F8F8',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
      disabled: '#9E9E9E',
    },
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#0B5D4C',
            opacity: 0.9,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#D4AF37',
            opacity: 0.9,
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
        outlinedPrimary: {
          borderColor: '#0B5D4C',
          '&:hover': {
            borderColor: '#0B5D4C',
            backgroundColor: 'rgba(11, 93, 76, 0.04)',
          },
        },
        outlinedSecondary: {
          borderColor: '#D4AF37',
          '&:hover': {
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export default luxuryTheme;