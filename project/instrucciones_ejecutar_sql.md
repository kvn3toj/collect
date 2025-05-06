# Instrucciones para ejecutar el script SQL en Supabase

Para crear la tabla `products` en tu base de datos Supabase, sigue estos pasos:

1. Ve al dashboard de Supabase: https://app.supabase.com/
2. Selecciona tu proyecto "ARETrust"
3. En el menú lateral izquierdo, selecciona "SQL Editor"
4. Haz clic en "New Query"
5. Copia y pega todo el contenido del archivo `migrations/create_products_table.sql` (lo que se muestra a continuación)

```sql
-- Crear tabla de productos si no existe
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stockStatus TEXT NOT NULL DEFAULT 'in_stock',
  category TEXT,
  metal TEXT,
  featured BOOLEAN DEFAULT false,
  description TEXT,
  stock INTEGER DEFAULT 0,
  images TEXT[],
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Desactivar RLS temporalmente para facilitar el desarrollo
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Insertar datos de ejemplo
INSERT INTO products (name, sku, price, stockStatus, category, metal, featured)
VALUES
  ('Diamond Pendant Necklace', 'DP-N1001', 450.00, 'in_stock', 'Necklaces', '18K White Gold', true),
  ('Pearl Stud Earrings', 'PE-S2001', 175.00, 'in_stock', 'Earrings', 'Silver', false),
  ('Gold Chain Bracelet', 'GC-B3001', 320.00, 'low_stock', 'Bracelets', '14K Gold', true),
  ('Emerald Ring', 'ER-R4001', 550.00, 'out_of_stock', 'Rings', 'Platinum', false),
  ('Sapphire Drop Earrings', 'SD-E5001', 375.00, 'in_stock', 'Earrings', '18K White Gold', true)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  stockStatus = EXCLUDED.stockStatus,
  category = EXCLUDED.category,
  metal = EXCLUDED.metal,
  featured = EXCLUDED.featured;

-- Crear trigger para actualizar automáticamente updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

6. Haz clic en "Run" (ejecutar)
7. Verifica que no haya errores en la ejecución
8. Ve a "Table Editor" en el menú lateral y confirma que la tabla "products" ahora existe y contiene los datos de ejemplo

Este script hace lo siguiente:
- Crea la tabla "products" con todos los campos necesarios
- Desactiva RLS (Row Level Security) para facilitar el desarrollo
- Inserta 5 productos de ejemplo
- Crea un trigger para actualizar automáticamente el campo "updatedAt" cuando se modifica un producto 