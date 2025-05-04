-- Crear la migración para añadir la columna role a la tabla profiles

-- Primero comprobamos si la tabla ya existe, si no, la creamos
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Añadir columna role si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_attribute
    WHERE attrelid = 'profiles'::regclass
    AND attname = 'role'
    AND NOT attisdropped
  ) THEN
    ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'user';
  END IF;
END $$;

-- Crear un índice para búsquedas por rol
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Establecer políticas RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política para leer cualquier perfil
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

-- Política para que usuarios solo puedan actualizar su propio perfil
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Política para que solo admins puedan cambiar roles
DROP POLICY IF EXISTS "Only admins can update roles" ON profiles;
CREATE POLICY "Only admins can update roles" 
  ON profiles FOR UPDATE
  USING (
    (auth.jwt() ->> 'email')::TEXT LIKE '%@aretrust.co'
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    (auth.jwt() ->> 'email')::TEXT LIKE '%@aretrust.co'
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Trigger para mantener sincronizada la tabla profiles con auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar y recrear el trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 