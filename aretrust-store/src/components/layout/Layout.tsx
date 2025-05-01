import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de Layout principal que incluye Header, Footer y configuración de Toaster
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      
      <Footer />
      
      {/* Configuración de toasts */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFFFFF',
            color: '#212121',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: {
              primary: '#66BB6A',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF5252',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </Box>
  );
};

export default Layout; 