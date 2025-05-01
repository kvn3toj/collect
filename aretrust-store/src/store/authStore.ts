import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials, RegisterData, User } from '../types';
import apiClient from '../services/api';

// Estado inicial de autenticación
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Crear el store con persistencia
export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    clearError: () => void;
  }
>(
  persist(
    (set) => ({
      ...initialState,

      // Iniciar sesión
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post('/auth/login', credentials);
          const { user, token } = response.data.data;
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al iniciar sesión',
          });
          throw error;
        }
      },

      // Registrar usuario
      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post('/auth/register', data);
          const { user, token } = response.data.data;
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al registrar usuario',
          });
          throw error;
        }
      },

      // Cerrar sesión
      logout: () => {
        set(initialState);
      },

      // Limpiar error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage', // nombre para localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Función de utilidad para obtener el token de autenticación (para el interceptor de axios)
export const getAuthToken = (): string | null => {
  const state = useAuthStore.getState();
  return state.token;
};

// Función de utilidad para comprobar si el usuario tiene un rol específico
export const hasRole = (role: 'CLIENTE' | 'ADMIN_PLATAFORMA' | 'ADMIN_TALLER'): boolean => {
  const { user } = useAuthStore.getState();
  return user?.role === role;
};

// Función de utilidad para comprobar si el usuario es administrador (cualquier tipo)
export const isAdmin = (): boolean => {
  const { user } = useAuthStore.getState();
  return user?.role === 'ADMIN_PLATAFORMA' || user?.role === 'ADMIN_TALLER';
}; 