import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'CLIENTE' | 'ADMIN_PLATAFORMA' | 'ADMIN_TALLER'>;
}

/**
 * Componente para proteger rutas que requieren autenticación
 * Opcionalmente, puede requerir roles específicos
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['CLIENTE', 'ADMIN_PLATAFORMA', 'ADMIN_TALLER'] 
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();
  
  // Mostrar indicador de carga mientras se verifica autenticación
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body1">Verificando credenciales...</Typography>
      </Box>
    );
  }
  
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Verificar si el usuario tiene un rol permitido
  const hasAllowedRole = user && allowedRoles.includes(user.role);
  
  // Si no tiene un rol permitido, redirigir a la página principal
  if (!hasAllowedRole) {
    return <Navigate to="/" replace />;
  }
  
  // Si está autenticado y tiene permisos, mostrar contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute; 