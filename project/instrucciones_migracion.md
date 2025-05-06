# Instrucciones para crear la tabla Products en Supabase

Puedes aplicar esta migración de dos formas:

## Opción 1: A través del SQL Editor de Supabase

1. Inicia sesión en tu dashboard de Supabase: https://app.supabase.io/
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea un "New Query"
5. Copia y pega todo el contenido del archivo `migrations/create_products_table.sql`
6. Haz clic en "RUN" para ejecutar la consulta
7. Verifica que la tabla se haya creado y los datos estén insertados en la sección "Table Editor"

## Opción 2: Usando la CLI de Supabase (si la tienes instalada)

```bash
# Navega a la carpeta donde se encuentra el archivo de migración
cd migrations

# Ejecuta la migración utilizando la CLI de Supabase
supabase db push --db-url="postgresql://postgres:[TU_PASSWORD]@db.[TU_PROJECT_REF].supabase.co:5432/postgres" create_products_table.sql
```

Reemplaza `[TU_PASSWORD]` y `[TU_PROJECT_REF]` con tus credenciales específicas.

## Verificación

Una vez aplicada la migración, puedes verificar que la tabla se haya creado correctamente:

1. En el dashboard de Supabase, ve a "Table Editor"
2. Deberías ver la tabla "products" con los 5 productos de ejemplo
3. Intenta luego probar la funcionalidad de edición de precios desde tu aplicación

## Notas importantes

- La tabla tiene RLS desactivado temporalmente para facilitar el desarrollo
- Se han incluido 5 productos de ejemplo que coinciden con los datos mock de tu aplicación
- El trigger `update_products_updated_at` actualizará automáticamente el campo `updatedAt` cuando se modifique un producto 