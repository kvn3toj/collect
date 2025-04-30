import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Catálogo', path: '/catalogo' },
  { label: 'Contacto', path: '/contacto' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2 }}>
        <Image 
          src="/images/logos/white/aretrust-logo-h.png" 
          alt="ARE Trüst Logo" 
          width={120} 
          height={40}
          priority
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            component={Link} 
            href={item.path}
            sx={{ 
              justifyContent: 'center',
              color: router.pathname === item.path ? 'primary.main' : 'text.primary',
              fontWeight: router.pathname === item.path ? 'bold' : 'normal',
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'background.paper', 
          borderBottom: 1, 
          borderColor: 'divider',
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Link href="/" passHref legacyBehavior>
                <a style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <Image 
                    src="/images/logos/white/aretrust-logo-h.png" 
                    alt="ARE Trüst Logo" 
                    width={120} 
                    height={40}
                    priority
                  />
                </a>
              </Link>
            </Box>

            {/* Navigation Links - Desktop */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.path} passHref legacyBehavior>
                  <Button 
                    component="a" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: router.pathname === item.path ? 'bold' : 'normal',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} ARE Trüst. Todos los derechos reservados.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.path} passHref legacyBehavior>
                  <Button 
                    component="a" 
                    size="small"
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 