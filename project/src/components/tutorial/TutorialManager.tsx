import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Box, Fab, Menu, MenuItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CollectionsIcon from '@mui/icons-material/Collections';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useLocation } from 'react-router-dom';

// Importamos todas las configuraciones de tutoriales
import { useHomeTutorial } from './HomeTutorial';
import { useOnboarding } from '../onboarding/OnboardingWizard'; // Asumiendo que exportas este hook
import { MicroTutorialContext } from './MicroTutorial';

// Contexto para gestionar los tutoriales globalmente
interface TutorialContextType {
  resetAllTutorials: () => void;
  showOnboardingWizard: () => void;
  showHomeTutorial: () => void;
  showConfiguratorTutorial: () => void;
  showCatalogTutorial: () => void;
  showCheckoutTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

export const useTutorialContext = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorialContext debe usarse dentro de un TutorialProvider');
  }
  return context;
};

// Componente de gestión de tutoriales
export const TutorialManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resetOnboarding } = useOnboarding();
  const { resetTutorial: resetHomeTutorial, start: startHomeTutorial } = useHomeTutorial();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const location = useLocation();
  
  // Acceso al contexto de MicroTutorial para controlar la activación
  const microTutorialContext = useContext(MicroTutorialContext);

  // Gestión de menú de ayuda
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Funciones de gestión de tutoriales
  const resetAllTutorials = () => {
    resetOnboarding();
    resetHomeTutorial();
    
    // Reset de los microtutoriales
    localStorage.removeItem('aretrustMicroTutorial_configurator');
    localStorage.removeItem('aretrustMicroTutorial_checkout');
    localStorage.removeItem('aretrustMicroTutorial_catalog');
    
    // Cerramos cualquier tutorial activo
    if (microTutorialContext) {
      microTutorialContext.setActiveTutorial(null);
    }
    
    // Recargamos la página para que los tutoriales se inicien automáticamente
    window.location.reload();
  };

  const showOnboardingWizard = () => {
    resetOnboarding();
    handleClose();
    
    // Cerramos cualquier tutorial activo
    if (microTutorialContext) {
      microTutorialContext.setActiveTutorial(null);
    }
    
    // El onboarding se mostrará automáticamente al recargar
    window.location.reload();
  };

  const showHomeTutorial = () => {
    // Cerramos cualquier tutorial activo
    if (microTutorialContext) {
      microTutorialContext.setActiveTutorial(null);
    }
    
    startHomeTutorial();
    handleClose();
  };

  const showConfiguratorTutorial = () => {
    localStorage.removeItem('aretrustMicroTutorial_configurator');
    handleClose();
    
    // Cerramos cualquier tutorial activo
    if (microTutorialContext) {
      microTutorialContext.setActiveTutorial(null);
    }
    
    // Navegamos al configurador si no estamos ya ahí
    if (location.pathname !== '/configurator') {
      window.location.href = '/configurator';
    } else {
      window.location.reload();
    }
  };

  const showCatalogTutorial = () => {
    localStorage.removeItem('aretrustMicroTutorial_catalog');
    handleClose();
    
    // Cerramos cualquier tutorial activo
    if (microTutorialContext) {
      microTutorialContext.setActiveTutorial(null);
    }
    
    // Navegamos al catálogo si no estamos ya ahí
    if (location.pathname !== '/catalog') {
      window.location.href = '/catalog';
    } else {
      window.location.reload();
    }
  };

  const showCheckoutTutorial = () => {
    localStorage.removeItem('aretrustMicroTutorial_checkout');
    handleClose();
    
    // Cerramos cualquier tutorial activo
    if (microTutorialContext) {
      microTutorialContext.setActiveTutorial(null);
    }
    
    // Navegamos al checkout si no estamos ya ahí
    if (location.pathname !== '/checkout') {
      window.location.href = '/checkout';
    } else {
      window.location.reload();
    }
  };

  // Valor del contexto
  const contextValue = useMemo(() => ({
    resetAllTutorials,
    showOnboardingWizard,
    showHomeTutorial,
    showConfiguratorTutorial,
    showCatalogTutorial,
    showCheckoutTutorial
  }), []);

  return (
    <TutorialContext.Provider value={contextValue}>
      {children}
      
      {/* Botón flotante de ayuda */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1050 }}>
        <Fab
          color="primary"
          aria-label="ayuda"
          onClick={handleOpen}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <HelpIcon />
        </Fab>
      </Box>
      
      {/* Menú de tutoriales */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: { width: 250, maxWidth: '90vw', mt: -2 }
        }}
      >
        <MenuItem onClick={handleClose} disabled>
          <Typography
            variant="subtitle2"
            fontFamily="'Playfair Display', serif"
            fontWeight="500"
            color="primary.main"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            Guías y Tutoriales
          </Typography>
        </MenuItem>
        
        <MenuItem onClick={showOnboardingWizard}>
          <ListItemIcon>
            <SchoolIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Conoce ARE Trüst" />
        </MenuItem>
        
        <MenuItem onClick={showHomeTutorial}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Navegación básica" />
        </MenuItem>
        
        <MenuItem onClick={showConfiguratorTutorial}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Configurador de joyas" />
        </MenuItem>
        
        <MenuItem onClick={showCatalogTutorial}>
          <ListItemIcon>
            <CollectionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Catálogo de colección" />
        </MenuItem>
        
        <MenuItem onClick={showCheckoutTutorial}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Proceso de compra" />
        </MenuItem>
        
        <MenuItem onClick={resetAllTutorials}>
          <ListItemIcon>
            <RestartAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Reiniciar todos los tutoriales" />
        </MenuItem>
      </Menu>
    </TutorialContext.Provider>
  );
};

export default TutorialManager; 