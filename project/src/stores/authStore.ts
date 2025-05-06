import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/user.types';
import { authService } from '../services/authService';
import { api } from '../services/api';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  updateUser: (user: Partial<User>) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/api/auth/login', { email, password });
          const { token, user } = response.data;
          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Login failed',
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          set({
            token: response.token,
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            set({
              user: currentUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            return false;
          }
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Authentication check failed',
          });
          return false;
        }
      },

      updateUser: (user: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;