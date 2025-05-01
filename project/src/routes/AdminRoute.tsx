import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if authenticated user is an admin or has @aretrust.co email
  const hasAreTrustEmail = user?.email && user.email.endsWith('@aretrust.co');
  if (user?.role !== 'admin' && !hasAreTrustEmail) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;