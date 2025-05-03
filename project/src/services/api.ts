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
const API_BASE_URL = import.meta.env.VITE_API_URL;
const IS_PRODUCTION = import.meta.env.PROD;

const API_CONFIG: AxiosRequestConfig = {
  // Usar URL completa en producción, proxy en desarrollo
  baseURL: IS_PRODUCTION ? API_BASE_URL : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
};

// Crear una instancia base de la API
const api: AxiosInstance = axios.create(API_CONFIG);

// Interceptor de solicitudes para agregar token de autenticación
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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

export default api;