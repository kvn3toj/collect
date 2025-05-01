import api from './api';
import { LoginCredentials, RegisterData, User, ResetPasswordData, UpdatePasswordData } from '../types/user.types';

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Buscamos el usuario que coincida con las credenciales
    const response = await api.get('/auth_login', {
      params: {
        email: credentials.email,
        password: credentials.password
      }
    });
    
    if (!response.data || response.data.length === 0) {
      throw new Error('Invalid credentials');
    }
    
    // Devolvemos la respuesta del primer usuario que coincida
    return response.data[0].response;
  },
  
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Para el mock, simplemente devolvemos la respuesta del usuario admin
    const response = await api.get('/auth_login/1');
    return response.data.response;
  },
  
  logout: async (): Promise<void> => {
    // No necesitamos hacer una llamada al servidor para logout
    return Promise.resolve();
  },
  
  getCurrentUser: async (): Promise<User> => {
    // Para el mock, devolvemos el usuario admin
    const response = await api.get('/auth_login/1');
    return response.data.response.user;
  },
  
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    return Promise.resolve({ message: 'Password reset email sent' });
  },
  
  updatePassword: async (data: UpdatePasswordData): Promise<{ message: string }> => {
    return Promise.resolve({ message: 'Password updated successfully' });
  },
  
  updateProfile: async (data: FormData): Promise<User> => {
    // Para el mock, devolvemos el usuario admin
    const response = await api.get('/auth_login/1');
    return response.data.response.user;
  },
};