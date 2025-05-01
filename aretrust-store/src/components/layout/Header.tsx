import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Button, 
  Container, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Toolbar, 
  Typography, 
  useMediaQuery,
  useScrollTrigger,
  Menu,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuthStore } from '../../store/authStore';

// Interfaces
interface NavigationItem {
  label: string;
  path: string;
  authRequired?: boolean;
  adminRequired?: boolean;
}

// Definir elementos de navegación
const navigationItems: NavigationItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Colección', path: '/collection' },
  { label: 'Personalizar', path: '/customize' },
  { label: 'Administración', path: '/admin/products', adminRequired: true }
];

// Componente para controlar la elevación del AppBar al hacer scroll
function ElevationScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'white' : 'transparent',
      color: trigger ? 'text.primary' : 'white',
      transition: 'all 0.3s ease',
      '.MuiButton-text': {
        color: trigger ? 'text.primary' : 'white',
      },
      '.logo-text': {
        color: trigger ? 'primary.main' : 'white',
      },
      borderBottom: trigger ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
    },
  });
}

/**
 * Componente de cabecera principal de la aplicación
 */
const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
  const { isAuthenticated, user, logout } = useAuthStore();
  
  const isHomePage = window.location.pathname === '/';
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  // Filtrar elementos de navegación según permisos
  const filteredNavItems = navigationItems.filter(item => {
    if (item.adminRequired) {
      return isAuthenticated && user?.role.includes('ADMIN');
    }
    if (item.authRequired) {
      return isAuthenticated;
    }
    return true;
  });
  
  // Contenido del drawer móvil
  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ my: 2, fontFamily: 'var(--font-display)', fontWeight: 600 }}
        className="logo-text"
      >
        ARETRUST
      </Typography>
      <Divider />
      <List>
        {filteredNavItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        {!isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={() => handleNavigation('/login')}
              >
                <ListItemText 
                  primary="Iniciar Sesión" 
                  primaryTypographyProps={{ 
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={() => handleNavigation('/register')}
              >
                <ListItemText 
                  primary="Registrarse" 
                  primaryTypographyProps={{ 
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={() => handleNavigation('/account')}
              >
                <ListItemText 
                  primary="Mi Cuenta" 
                  primaryTypographyProps={{ 
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={handleLogout}
              >
                <ListItemText 
                  primary="Cerrar Sesión" 
                  primaryTypographyProps={{ 
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar
          position={isHomePage ? 'absolute' : 'sticky'}
          color="transparent"
          sx={{
            boxShadow: 'none',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Container>
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              {/* Logo */}
              <Typography
                variant="h5"
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
                className="logo-text"
              >
                ARETRUST
              </Typography>

              {/* Navegación para escritorio */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {filteredNavItems.map((item) => (
                    <Button
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      sx={{ 
                        mx: 1.5, 
                        fontWeight: 500,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-primary)'
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Acciones de usuario */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Menú de usuario para escritorio */}
                {!isMobile && (
                  <>
                    {isAuthenticated ? (
                      <>
                        <IconButton onClick={handleOpenUserMenu} color="inherit">
                          <PersonOutlineIcon />
                        </IconButton>
                        <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          <MenuItem onClick={() => {
                            handleCloseUserMenu();
                            navigate('/account');
                          }}>
                            <Typography textAlign="center">Mi Cuenta</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">Cerrar Sesión</Typography>
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <>
                        <Button
                          component={RouterLink}
                          to="/login"
                          variant="text"
                          sx={{
                            mx: 1,
                            fontWeight: 500,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontFamily: 'var(--font-primary)'
                          }}
                        >
                          Iniciar Sesión
                        </Button>
                        <Button
                          component={RouterLink}
                          to="/register"
                          variant="contained"
                          color="secondary"
                          sx={{
                            ml: 1,
                            fontWeight: 500,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontFamily: 'var(--font-primary)'
                          }}
                        >
                          Registrarse
                        </Button>
                      </>
                    )}
                  </>
                )}

                {/* Botón de menú para móvil */}
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      {/* Drawer para navegación móvil */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móviles
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header; 