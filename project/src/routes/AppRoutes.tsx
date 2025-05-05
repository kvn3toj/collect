import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './PrivateRoute';
import PageTransition from '../components/common/PageTransition';

// Pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AtelierPage from '../pages/AtelierPage';
import CustomizerPage from '../pages/CustomizerPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AccountPage from '../pages/account/AccountPage';
import NotFoundPage from '../pages/NotFoundPage';
import { CraftsmanshipShowcase } from '../components/premium/CraftsmanshipShowcase';
import { CareProgram } from '../components/premium/CareProgram';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderCompletePage from '../pages/OrderCompletePage';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/products"
          element={
            <PageTransition>
              <ProductsPage />
            </PageTransition>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PageTransition>
              <ProductDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <RegisterPage />
            </PageTransition>
          }
        />
        
        {/* Cart Route */}
        <Route
          path="/cart"
          element={
            <PageTransition>
              <CartPage />
            </PageTransition>
          }
        />
        
        {/* Premium Feature Routes */}
        <Route
          path="/craftsmanship"
          element={
            <PageTransition>
              <CraftsmanshipShowcase />
            </PageTransition>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/atelier"
          element={
            <PrivateRoute>
              <PageTransition>
                <AtelierPage />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/customizer"
          element={
            <PrivateRoute>
              <PageTransition>
                <CustomizerPage />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <PageTransition>
                <AccountPage />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/care-program"
          element={
            <PrivateRoute>
              <PageTransition>
                <CareProgram />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <PageTransition>
                <CheckoutPage />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/order-complete"
          element={
            <PrivateRoute>
              <PageTransition>
                <OrderCompletePage />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;