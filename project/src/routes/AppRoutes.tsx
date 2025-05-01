import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/ui/LoadingScreen';

// Lazy loaded pages
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CustomizerPage = lazy(() => import('../pages/CustomizerPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const AccountPage = lazy(() => import('../pages/account/AccountPage'));
const OrdersPage = lazy(() => import('../pages/account/OrdersPage'));
const OrderDetailPage = lazy(() => import('../pages/account/OrderDetailPage'));
const AddressesPage = lazy(() => import('../pages/account/AddressesPage'));
const WishlistPage = lazy(() => import('../pages/account/WishlistPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('../pages/admin/AdminOrdersPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="customize/:id" element={<CustomizerPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="404" element={<NotFoundPage />} />
          
          {/* Protected customer routes */}
          <Route 
            path="checkout" 
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="account" 
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="account/orders" 
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="account/orders/:id" 
            element={
              <PrivateRoute>
                <OrderDetailPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="account/addresses" 
            element={
              <PrivateRoute>
                <AddressesPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="account/wishlist" 
            element={
              <PrivateRoute>
                <WishlistPage />
              </PrivateRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="admin" 
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="admin/products" 
            element={
              <AdminRoute>
                <AdminProductsPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="admin/orders" 
            element={
              <AdminRoute>
                <AdminOrdersPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="admin/users" 
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;