import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Función para leer env.config.json
function loadEnvConfigJson() {
  try {
    const configPath = path.resolve(__dirname, 'env.config.json');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(configContent);
    }
  } catch (error) {
    console.error('Error loading env.config.json:', error);
  }
  return {};
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables de entorno estándar de .env files
  const envVars = loadEnv(mode, process.cwd());
  
  // Carga variables de env.config.json
  const jsonConfig = loadEnvConfigJson();
  
  // Define valores por defecto
  const defaultValues = {
    VITE_API_URL: 'https://api.aretrust.store',
    VITE_AUTH_DOMAIN: 'auth.aretrust.store',
    VITE_PUBLIC_URL: 'https://aretrust.store',
    VITE_DEBUG_MODE: 'false'
  };

  // Combina las variables con prioridad: .env > env.config.json > valores por defecto
  const combinedEnv = {
    ...defaultValues,
    ...jsonConfig,
    ...envVars
  };

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      // Define las variables de entorno
      'import.meta.env.VITE_API_URL': JSON.stringify(combinedEnv.VITE_API_URL),
      'import.meta.env.VITE_AUTH_DOMAIN': JSON.stringify(combinedEnv.VITE_AUTH_DOMAIN),
      'import.meta.env.VITE_PUBLIC_URL': JSON.stringify(combinedEnv.VITE_PUBLIC_URL),
      'import.meta.env.VITE_DEBUG_MODE': JSON.stringify(combinedEnv.VITE_DEBUG_MODE)
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
        '/me': {
          target: 'http://localhost:3001',
          rewrite: (path) => path.replace(/^\/me/, '/api/auth/me')
        },
        '/cart': {
          target: 'http://localhost:3001',
          rewrite: (path) => path.replace(/^\/cart/, '/api/cart')
        },
        '/products': {
          target: 'http://localhost:3001',
          rewrite: (path) => path.replace(/^\/products/, '/api/products')
        }
      }
    }
  };
});
