import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError 
} from 'axios';
import useAuthStore from '../stores/authStore';

/**
 * Configuración base para la API
 */
// Obtener la URL base de la API desde las variables de entorno
// Usar explícitamente la variable de entorno para asegurar que esté disponible en producción
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const API_CONFIG: AxiosRequestConfig = {
  // Siempre usar la URL definida
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
};

// Crear una instancia base de la API
export const api: AxiosInstance = axios.create(API_CONFIG);

// Interceptor de solicitudes para agregar token de autenticación
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Eliminar lógica de anteponer /api para evitar rutas duplicadas
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores comunes
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Manejar errores 401 No autorizado (token expirado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Cerrar sesión del usuario porque el token ha expirado
      useAuthStore.getState().logout();
      
      // La redirección a la página de inicio de sesión se puede manejar en los componentes de UI
    }
    
    return Promise.reject(error);
  }
);

// Para mantener compatibilidad con código que pueda usar import api from '../services/api'
export default api;