// Usuario y Autenticación
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CLIENTE' | 'ADMIN_PLATAFORMA' | 'ADMIN_TALLER';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

// Productos
export type ProductType = 'ANILLO' | 'COLLAR' | 'PENDIENTES' | 'PULSERA' | 'GEMA_SUELTA';

export interface Product {
  id: string;
  name: string;
  slug: string;
  codigo: string;
  description: string;
  price: number | null; // Puede ser null para productos "a pedido"
  discountPrice?: number;
  type: ProductType;
  mainImage: string; // URL de imagen principal
  images: string[]; // URLs de galería de imágenes
  featured: boolean;
  quilates?: number; // Para gemas
  metal?: string; // Para joyería
  cut?: string; // Para gemas
  quality?: string; // Calidad/pureza
  origin?: string; // Origen de la gema
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  codigo: string;
  description: string;
  price: number | null;
  discountPrice?: number;
  type: ProductType;
  mainImage: File | null;
  images: File[];
  featured: boolean;
  quilates?: number;
  metal?: string;
  cut?: string;
  quality?: string;
  origin?: string;
}

// Datos de catálogo para el personalizador
export interface CatalogData {
  jewelryTypes: string[];
  metals: string[];
  cuts: string[];
  qualities: string[];
  origins: string[];
}

// Para filtros y ordenación en la página de catálogo
export interface FilterOptions {
  type?: ProductType;
  priceMin?: number;
  priceMax?: number;
  featured?: boolean;
}

export interface SortOptions {
  field: 'price' | 'createdAt';
  direction: 'asc' | 'desc';
}

// Configuración para personalización
export interface CustomizationConfig {
  jewelryType: string;
  metal: string;
  quilates: number;
  cut: string;
  quality: string;
  origin: string;
}

// Resultado de estimación de precio
export interface PriceEstimate {
  estimatedPrice: number;
  breakdown: {
    basePrice: number;
    metalPrice: number;
    workmanship: number;
    other: number;
  };
}

// API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
} 