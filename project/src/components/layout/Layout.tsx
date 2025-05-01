import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import CartDrawer from '../cart/CartDrawer';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          pt: { xs: 8, sm: 10 }, // Adjust for header height
        }}
      >
        <Outlet />
      </Box>
      <CartDrawer />
      <Footer />
    </Box>
  );
};

export default Layout;