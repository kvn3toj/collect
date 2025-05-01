import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuthStore from '../stores/authStore';

// Create a base API instance
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Log the user out as token has expired
      useAuthStore.getState().logout();
      
      // Redirect to login page can be handled in the UI components
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default api;