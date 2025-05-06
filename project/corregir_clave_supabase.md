# Corregir formato de la clave API de Supabase

Uno de los errores comunes que puede ocurrir es "Invalid API key" cuando la clave API de Supabase está en formato incorrecto. Este error suele ocurrir cuando:

1. La clave está distribuida en múltiples líneas en el archivo `env.config.json`
2. Hay espacios o caracteres especiales adicionales en la clave

## Solución para claves en múltiples líneas

Si tu clave API de Supabase está distribuida en múltiples líneas en tu archivo `env.config.json`, debes modificarla para que esté en una sola línea.

Abre el archivo `env.config.json` y asegúrate de que la clave `VITE_SUPABASE_ANON_KEY` está en una sola línea, como se muestra a continuación:

```json
{
  "VITE_SUPABASE_URL": "https://vzjysbwsqmiqljpwpjvt.supabase.co",
  "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjQ5NzAsImV4cCI6MjAyNTUwMDk3MH0.1234567890abcdefghijklmnopqrstuvwxyz"
}
```

En lugar de:

```json
{
  "VITE_SUPABASE_URL": "https://vzjysbwsqmiqljpwpjvt.supabase.co",
  "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
                           eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanl0Iiw
                           icm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjQ5NzAsImV4cCI6MjAyNTUwMDk3MH0.
                           1234567890abcdefghijklmnopqrstuvwxyz"
}
```

## Script para corregir automáticamente el formato

Si el problema persiste, puedes crear un pequeño script para formatear correctamente la clave API. A continuación se muestra un ejemplo:

```javascript
// fix_supabase_key.js
const fs = require('fs');
const path = require('path');

// Ruta al archivo de configuración
const configPath = path.resolve(__dirname, 'env.config.json');

// Leer el archivo
try {
  const configData = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configData);
  
  // Obtener la clave actual y eliminar posibles saltos de línea y espacios extra
  const currentKey = config.VITE_SUPABASE_ANON_KEY || '';
  const fixedKey = currentKey.replace(/\s+/g, '');
  
  // Actualizar la clave
  config.VITE_SUPABASE_ANON_KEY = fixedKey;
  
  // Guardar el archivo
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2),
    'utf8'
  );
  
  console.log('✅ Clave API de Supabase corregida correctamente');
} catch (error) {
  console.error('❌ Error al procesar el archivo:', error);
}
```

Ejecuta este script con:

```bash
node fix_supabase_key.js
```

Después de corregir la clave API, reinicia la aplicación para que los cambios surtan efecto. 