/**
 * Roles de usuario disponibles en el sistema
 */
export type UserRole = 'user' | 'admin';

/**
 * Tipos de direcciones disponibles
 */
export type AddressType = 'billing' | 'shipping';

/**
 * Interfaz principal para un usuario
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interfaz para la información completa del perfil de usuario
 */
export interface UserProfile extends User {
  addresses?: Address[];
  preferences?: UserPreferences;
}

/**
 * Preferencias de usuario
 */
export interface UserPreferences {
  language?: string;
  currency?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    promotions: boolean;
  };
}

/**
 * Dirección de usuario (envío o facturación)
 */
export interface Address {
  id: string;
  userId: string;
  type: AddressType;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
}

/**
 * Estado global de autenticación
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Credenciales para inicio de sesión
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Datos para registro de nuevo usuario
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Datos para solicitar restablecimiento de contraseña
 */
export interface ResetPasswordData {
  email: string;
}

/**
 * Datos para actualizar contraseña
 */
export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Datos para actualizar perfil de usuario
 */
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: File;
}