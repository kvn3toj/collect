# Instrucciones para configurar la tabla de productos en Supabase

Para que la aplicación funcione correctamente con el módulo de administración de productos, necesitamos crear la tabla `products` en Supabase. Sigue estos pasos:

## Opción 1: Crear la tabla desde el Panel de Supabase

1. Inicia sesión en [Supabase](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea un nuevo script pulsando en "New query"
5. Copia y pega el contenido del archivo `setup_products_table.sql`
6. Ejecuta el script pulsando el botón "Run"

## Opción 2: Crear la tabla usando Supabase CLI

Si tienes Supabase CLI instalado:

1. Asegúrate de estar conectado a tu proyecto:
   ```bash
   supabase link --project-ref tu-referencia-de-proyecto
   ```

2. Ejecuta el script SQL:
   ```bash
   supabase db execute --file setup_products_table.sql
   ```

## Verificación

Para comprobar que la tabla se ha creado correctamente:

1. Ve a la sección "Table Editor" en el panel de Supabase
2. Deberías ver una tabla llamada "products" con 5 registros
3. Si puedes ver la tabla y los datos, la configuración se ha realizado correctamente

## Accediendo a la página de administración

Una vez creada la tabla, puedes acceder a la página de administración de productos en:

```
http://localhost:5174/admin/products
```

> **Nota:** En un entorno de producción, deberías configurar políticas RLS (Row Level Security) para proteger estos datos. Para fines de desarrollo, puedes desactivar RLS temporalmente, pero recuerda activarlo antes de desplegar a producción. 