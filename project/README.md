# Aretrust Store Project

Este proyecto utiliza React, TypeScript, Vite y otras tecnologías modernas para crear una aplicación web.

## Configuración de Variables de Entorno

Este proyecto maneja las variables de entorno de tres formas diferentes para facilitar el desarrollo y el uso con herramientas como Cursor AI:

### 1. Archivo `.env` (Tradicional)

Puedes crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
VITE_API_URL=https://api.aretrust.store
VITE_AUTH_DOMAIN=auth.aretrust.store
VITE_PUBLIC_URL=https://aretrust.store
VITE_DEBUG_MODE=false
```

### 2. Archivo `env.config.json` (Compatible con Cursor AI)

Como alternativa para herramientas como Cursor AI que pueden tener restricciones para editar archivos `.env`, puedes usar el archivo `env.config.json`:

```json
{
  "VITE_API_URL": "https://api.aretrust.store",
  "VITE_AUTH_DOMAIN": "auth.aretrust.store",
  "VITE_PUBLIC_URL": "https://aretrust.store",
  "VITE_DEBUG_MODE": "false"
}
```

### 3. Valores por defecto

El archivo `vite.config.ts` incluye valores por defecto para estas variables, siguiendo este orden de prioridad:
1. Variables en `.env`
2. Variables en `env.config.json`
3. Valores por defecto en el código

## Ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estructura del proyecto

- `/src` - Código fuente
  - `/components` - Componentes React
  - `/services` - Servicios y API
  - `/stores` - Estado global con Zustand
  - `/theme` - Configuración de tema
  - `/types` - Definiciones de tipos TypeScript 