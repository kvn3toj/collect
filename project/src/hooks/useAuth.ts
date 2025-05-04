import { useEffect, useState } from 'react';
import { supabaseClient } from '../lib/supabaseClient';
import useAuthStore from '../stores/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isAuthenticated || !user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verificación rápida basada en el correo electrónico
        if (user.email && user.email.endsWith('@aretrust.co')) {
          setIsAdmin(true);
          setIsLoading(false);
          return;
        }

        // Verificación basada en el rol almacenado
        if (user.role === 'admin') {
          setIsAdmin(true);
          setIsLoading(false);
          return;
        }

        // Si no tenemos el rol, intentamos obtenerlo de la base de datos
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error al verificar el rol del usuario:', error);
          setIsAdmin(false);
        } else if (data?.role === 'admin') {
          // Actualizar el estado global y local
          updateUser({ ...user, role: data.role });
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error al verificar permisos de administrador:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [isAuthenticated, user, updateUser]);

  return { 
    user, 
    isAuthenticated, 
    isAdmin, 
    isLoading 
  };
};

export default useAuth; 