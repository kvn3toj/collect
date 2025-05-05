import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../common/PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 3, sm: 4, md: 6 }
        }}
      >
        <Container maxWidth="xl">
          <PageTransition>
            {children}
          </PageTransition>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;