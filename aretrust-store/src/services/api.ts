import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../types';
import { getAuthToken } from '../store/authStore';

// Configuración de la URL base de API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios con configuración personalizada
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para añadir token de autenticación a las solicitudes
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    // Construir un objeto de error estándar
    const apiError: ApiError = {
      message: error.message || 'Ocurrió un error inesperado',
      status: error.response?.status || 500,
    };

    // Si hay datos de error específicos en la respuesta
    if (error.response?.data) {
      if (typeof error.response.data === 'object') {
        apiError.message = (error.response.data as any).message || apiError.message;
        apiError.errors = (error.response.data as any).errors;
      }
    }

    // Manejar errores de autenticación (401)
    if (error.response?.status === 401) {
      // Si es necesario, aquí podríamos limpiar el token/sesión
      // Por ejemplo: authStore.setState({ token: null, user: null, isAuthenticated: false });
      // O redirigir al login
      // window.location.href = '/login';
    }

    // Rechazar la promesa con el error estandarizado
    return Promise.reject(apiError);
  }
);

export default apiClient; 