import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Importar páginas con lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
// Las demás páginas se importarán también con lazy

// Placeholder para páginas en desarrollo
const PlaceholderPage = ({ title }: { title: string }) => (
  <Box sx={{ py: 10, textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Esta página está en desarrollo.</p>
  </Box>
);

// Componente de carga para lazy loading
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

/**
 * Componente principal de la aplicación
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Layout>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<HomePage />} />
          
          {/* Catálogo */}
          <Route
            path="/collection"
            element={<PlaceholderPage title="Catálogo" />}
          />
          
          {/* Detalle de producto */}
          <Route
            path="/product/:slug"
            element={<PlaceholderPage title="Detalle de Producto" />}
          />
          
          {/* Personalizador */}
          <Route
            path="/customize"
            element={<PlaceholderPage title="Personaliza Tu Joya" />}
          />
          
          {/* Autenticación */}
          <Route
            path="/login"
            element={<PlaceholderPage title="Iniciar Sesión" />}
          />
          
          <Route
            path="/register"
            element={<PlaceholderPage title="Registro" />}
          />
          
          {/* Área de usuario (protegida) */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <PlaceholderPage title="Mi Cuenta" />
              </ProtectedRoute>
            }
          />
          
          {/* Administración (protegido, solo admin) */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={['ADMIN_PLATAFORMA', 'ADMIN_TALLER']}>
                <PlaceholderPage title="Administración de Productos" />
              </ProtectedRoute>
            }
          />
          
          {/* Páginas legales */}
          <Route
            path="/terms"
            element={<PlaceholderPage title="Términos y Condiciones" />}
          />
          
          <Route
            path="/privacy"
            element={<PlaceholderPage title="Política de Privacidad" />}
          />
          
          <Route
            path="/shipping"
            element={<PlaceholderPage title="Envíos y Devoluciones" />}
          />
          
          <Route
            path="/legal"
            element={<PlaceholderPage title="Aviso Legal" />}
          />
          
          {/* Redirigir las rutas no existentes a la página principal */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
