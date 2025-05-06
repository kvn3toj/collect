# Instrucciones para corregir el formato de VITE_SUPABASE_ANON_KEY

Hemos detectado que la API key de Supabase en tu archivo `.env` podría estar fragmentada en múltiples líneas, lo que causa problemas de autenticación. Sigue estos pasos para corregirlo:

## 1. Abre el archivo .env

```bash
nano .env
# o con cualquier editor de texto que prefieras
```

## 2. Busca la variable VITE_SUPABASE_ANON_KEY

Debería verse algo como esto (dividida en múltiples líneas):

```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMzAwMDAsImV4cCI6MTcxNjkzNDgwMH0.examplekeyfordemopurposesdon
tusethis
```

## 3. Modifícala para que esté en una sola línea

Debe quedar así:

```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMzAwMDAsImV4cCI6MTcxNjkzNDgwMH0.examplekeyfordemopurposesdontusethis
```

## 4. Guarda el archivo y reinicia la aplicación

```bash
# Guarda el archivo y luego reinicia el servidor de desarrollo
npm run dev
```

## 5. Verifica la conexión

Una vez corregido el formato, la aplicación debería poder conectarse correctamente a Supabase. Navega a la página de productos (/admin/products) y prueba la edición de precios.

## Nota importante

Si ya has aplicado el script SQL para crear la tabla `products` en Supabase, la aplicación debería funcionar correctamente una vez corregido el formato de la API key. 