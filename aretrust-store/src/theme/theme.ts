import { createTheme } from '@mui/material/styles';
import { PaletteOptions, ThemeOptions } from '@mui/material';

// Definición de la paleta de colores de lujo
const palette: PaletteOptions = {
  primary: {
    main: '#004d40', // Deep emerald green
    light: '#39796b',
    dark: '#00251a',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#E1C16E', // Sophisticated Gold
    light: '#ffef9c',
    dark: '#ab9142',
    contrastText: '#000000',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F8F9FA',
  },
  text: {
    primary: '#212121', // Dark Gray/Black
    secondary: '#555555', // Lighter gray
    disabled: '#B0BEC5', // Lightest gray
  },
  error: {
    main: '#FF5252',
    light: '#FF867F',
    dark: '#C50E29',
  },
  success: {
    main: '#66BB6A',
    light: '#98EE99',
    dark: '#338A3E',
  },
  warning: {
    main: '#FFA726',
    light: '#FFD95B',
    dark: '#C77800',
  },
};

// Definición de la tipografía personalizada
const typography = {
  fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 600,
    fontSize: '2.5rem',
    '@media (min-width:600px)': {
      fontSize: '3.5rem',
    },
  },
  h2: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 500,
    fontSize: '2rem',
    '@media (min-width:600px)': {
      fontSize: '2.5rem',
    },
  },
  h3: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 500,
    fontSize: '1.5rem',
    '@media (min-width:600px)': {
      fontSize: '1.8rem',
    },
  },
  h4: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 500,
    fontSize: '1.25rem',
    '@media (min-width:600px)': {
      fontSize: '1.4rem',
    },
  },
  h5: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 500,
  },
  h6: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 500,
  },
  subtitle1: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
  },
  subtitle2: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
  },
  body1: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
  },
  body2: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
  },
  button: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 500,
    textTransform: 'none',
  },
  caption: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
  },
  overline: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 400,
  },
};

// Configuración adicional del tema
const themeOptions: ThemeOptions = {
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
          padding: '10px 24px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#00352c',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme; 