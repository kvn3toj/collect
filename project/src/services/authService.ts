import { supabaseClient } from '../supabaseClient';
import { LoginCredentials, RegisterData, User, ResetPasswordData, UpdatePasswordData } from '../types/user.types';

interface AuthResponse {
  token: string;
  user: User;
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  /**
   * Inicia sesión con las credenciales proporcionadas usando Supabase Auth
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error || !data.session || !data.user) {
      throw new AuthError(error?.message || 'Credenciales inválidas');
    }
    // Obtener perfil extendido (incluyendo rol) desde profiles
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    if (profileError) {
      throw new AuthError('No se pudo obtener el perfil del usuario');
    }
    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      role: profile.role,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
    return {
      token: data.session.access_token,
      user,
    };
  },

  /**
   * Registra un nuevo usuario usando Supabase Auth
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const { data: signUpData, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });
    if (error || !signUpData.session || !signUpData.user) {
      throw new AuthError(error?.message || 'No se pudo registrar el usuario');
    }
    // Insertar/obtener perfil extendido
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', signUpData.user.id)
      .single();
    if (profileError) {
      throw new AuthError('No se pudo obtener el perfil del usuario');
    }
    const user: User = {
      id: signUpData.user.id,
      email: signUpData.user.email!,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      role: profile.role,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
    return {
      token: signUpData.session.access_token,
      user,
    };
  },

  /**
   * Obtiene el usuario actualmente autenticado y su perfil extendido
   */
  getCurrentUser: async (): Promise<User | null> => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session || !session.user) return null;
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    if (profileError) {
      throw new AuthError('No se pudo obtener el perfil del usuario');
    }
    return {
      id: session.user.id,
      email: session.user.email!,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      role: profile.role,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
  },

  /**
   * Cierra la sesión del usuario actual
   */
  logout: async (): Promise<void> => {
    await supabaseClient.auth.signOut();
  },

  /**
   * Solicita un restablecimiento de contraseña
   */
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(data.email);
    if (error) throw new AuthError(error.message);
    return { message: 'Se ha enviado un correo para restablecer la contraseña' };
  },

  /**
   * Actualiza la contraseña del usuario
   */
  updatePassword: async (data: UpdatePasswordData): Promise<{ message: string }> => {
    const { error } = await supabaseClient.auth.updateUser({ password: data.newPassword });
    if (error) throw new AuthError(error.message);
    return { message: 'Contraseña actualizada exitosamente' };
  },

  /**
   * Actualiza el perfil del usuario
   */
  updateProfile: async (data: FormData): Promise<User> => {
    // Aquí deberías mapear los campos de FormData a los campos de la tabla profiles
    const updates: any = {};
    data.forEach((value, key) => {
      updates[key] = value;
    });
    const { data: user } = await supabaseClient.auth.getUser();
    if (!user || !user.id) throw new AuthError('No hay usuario autenticado');
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    if (error) throw new AuthError('No se pudo actualizar el perfil');
    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      role: profile.role,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
  },
};