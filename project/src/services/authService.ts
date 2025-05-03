import api from './api';
import { LoginCredentials, RegisterData, User, ResetPasswordData, UpdatePasswordData } from '../types/user.types';
import { AxiosResponse } from 'axios';

interface AuthResponse {
  token: string;
  user: User;
}

interface ServerResponse {
  response: AuthResponse;
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  /**
   * Inicia sesión con las credenciales proporcionadas
   * @param credentials Credenciales de inicio de sesión
   * @throws {AuthError} Si las credenciales son inválidas
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // Buscamos el usuario que coincida con las credenciales
      const response = await api.get<ServerResponse[]>('/auth_login', {
        params: {
          email: credentials.email,
          password: credentials.password
        }
      });
      
      if (!response.data || response.data.length === 0) {
        throw new AuthError('Credenciales inválidas');
      }
      
      // Devolvemos la respuesta del primer usuario que coincida
      return response.data[0].response;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Error al iniciar sesión');
    }
  },
  
  /**
   * Registra un nuevo usuario
   * @param data Datos de registro
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      // Para el mock, simplemente devolvemos la respuesta del usuario admin
      const response = await api.get<ServerResponse>('/auth_login/1');
      return response.data.response;
    } catch (error) {
      throw new AuthError('Error al registrar usuario');
    }
  },
  
  /**
   * Cierra la sesión del usuario actual
   */
  logout: async (): Promise<void> => {
    // No necesitamos hacer una llamada al servidor para logout
    return Promise.resolve();
  },
  
  /**
   * Obtiene el usuario actualmente autenticado
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      // Para el mock, devolvemos el usuario admin
      const response = await api.get<ServerResponse>('/auth_login/1');
      return response.data.response.user;
    } catch (error) {
      throw new AuthError('Error al obtener el usuario actual');
    }
  },
  
  /**
   * Solicita un restablecimiento de contraseña
   * @param data Datos para restablecer contraseña
   */
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    // Simulación de éxito
    return Promise.resolve({ message: 'Se ha enviado un correo para restablecer la contraseña' });
  },
  
  /**
   * Actualiza la contraseña del usuario
   * @param data Datos para actualizar contraseña
   */
  updatePassword: async (data: UpdatePasswordData): Promise<{ message: string }> => {
    // Simulación de éxito
    return Promise.resolve({ message: 'Contraseña actualizada exitosamente' });
  },
  
  /**
   * Actualiza el perfil del usuario
   * @param data Datos del perfil en FormData
   */
  updateProfile: async (data: FormData): Promise<User> => {
    try {
      // Para el mock, devolvemos el usuario admin
      const response = await api.get<ServerResponse>('/auth_login/1');
      return response.data.response.user;
    } catch (error) {
      throw new AuthError('Error al actualizar el perfil');
    }
  },
};