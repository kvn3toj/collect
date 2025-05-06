# Instrucciones para corregir el archivo .env

El archivo `.env` actual contiene comentarios y la clave API está en múltiples líneas. Reemplaza el contenido completo del archivo con lo siguiente:

```
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=https://vzjysbwsqmiqljpwpjvt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MTExMjcsImV4cCI6MjA2MTM4NzEyN30.fZc3nBVQwwmYgZq5S7MFRXHZd04MJCeHSECmm-bdtNk
```

Para aplicar este cambio:

```bash
# Copia el texto anterior y ejecútalo
cat > .env << 'EOL'
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=https://vzjysbwsqmiqljpwpjvt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MTExMjcsImV4cCI6MjA2MTM4NzEyN30.fZc3nBVQwwmYgZq5S7MFRXHZd04MJCeHSECmm-bdtNk
EOL
```

Esto garantiza que la clave API de Supabase esté en una sola línea, lo que es esencial para que funcione correctamente. 