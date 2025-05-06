# Pasos para completar la implementación del CRUD de productos

Para hacer que la funcionalidad de edición de precios funcione correctamente con Supabase, sigue estos pasos en orden:

## 1. Corregir el formato de la API key

La API key de Supabase en el archivo `.env` está fragmentada en múltiples líneas, lo que causa problemas de autenticación.

**Solución:**
1. Ejecuta el script que hemos creado para obtener la clave en formato correcto:
   ```bash
   node fix_supabase_key.mjs
   ```

2. Copia la línea completa que muestra el script.

3. Abre tu archivo `.env` en un editor de texto y reemplaza todas las líneas relacionadas con `VITE_SUPABASE_ANON_KEY` con la única línea que copiaste.

4. Guarda el archivo.

## 2. Crear la tabla de productos en Supabase

Necesitas ejecutar el script SQL que hemos creado para configurar la tabla de productos.

**Solución:**
1. Inicia sesión en el dashboard de Supabase: https://app.supabase.io/
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea un "New Query"
5. Copia y pega todo el contenido del archivo `migrations/create_products_table.sql` 
6. Haz clic en "RUN" para ejecutar la consulta

## 3. Verificar la conexión con Supabase

Una vez aplicados los cambios anteriores, verifica que la conexión está funcionando:

**Solución:**
1. Ejecuta el script de verificación:
   ```bash
   node check_supabase_connection.mjs
   ```

2. Si todo está configurado correctamente, deberías ver un mensaje de "Conexión exitosa" y la lista de productos.

## 4. Reiniciar la aplicación

Reinicia el servidor de desarrollo para aplicar todos los cambios:

**Solución:**
```bash
npm run dev
```

## 5. Probar la funcionalidad

Una vez que la aplicación esté ejecutándose:

1. Navega a `/admin/products`
2. Verifica que los productos se cargan desde Supabase
3. Haz clic en el icono de edición (lápiz) de cualquier producto
4. Modifica el precio y haz clic en "Guardar"
5. Confirma que:
   - El precio se actualiza en la UI
   - Aparece el toast de confirmación
   - La carga se maneja correctamente (botón "Guardando...")

## Notas importantes

- La tabla `products` en Supabase tiene RLS desactivado temporalmente para facilitar el desarrollo
- Si encuentras algún problema, revisa la consola del navegador para obtener más detalles
- El componente de edición de precios ya está configurado para usar React Query y manejar estados de carga

## Solución de problemas comunes

1. **Error "Invalid API key"**: Asegúrate de que el formato de la API key sea correcto
2. **Error "Table not found"**: Verifica que el script SQL se haya ejecutado correctamente
3. **Sin cambios después de editar**: Confirma que las mutaciones de React Query están funcionando y comprueba la consola del navegador 