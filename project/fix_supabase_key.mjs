// Script para extraer y mostrar la API key correcta
// Ejecutar con: node fix_supabase_key.mjs

import { readFileSync } from 'fs';

try {
  // Leer el archivo .env
  const envFile = readFileSync('.env', 'utf8');
  const lines = envFile.split('\n');
  
  // Encontrar las líneas de la API key
  const keyLines = lines.filter(line => line.includes('VITE_SUPABASE_ANON_KEY') || 
      (lines.indexOf(line) > 0 && 
       lines[lines.indexOf(line)-1].includes('VITE_SUPABASE_ANON_KEY') && 
       !line.includes('=')));
  
  if (keyLines.length === 0) {
    console.error('No se encontró VITE_SUPABASE_ANON_KEY en el archivo .env');
    process.exit(1);
  }
  
  // Extraer y combinar la clave
  let combinedKey = '';
  keyLines.forEach(line => {
    if (line.includes('=')) {
      combinedKey += line.split('=')[1].trim();
    } else {
      combinedKey += line.trim();
    }
  });
  
  console.log('\n=== COPIA ESTA LÍNEA EN TU ARCHIVO .ENV ===\n');
  console.log(`VITE_SUPABASE_ANON_KEY=${combinedKey}`);
  console.log('\n=========================================\n');
  console.log('Instrucciones:');
  console.log('1. Copia la línea completa mostrada arriba');
  console.log('2. Abre tu archivo .env en un editor de texto');
  console.log('3. Reemplaza todas las líneas de VITE_SUPABASE_ANON_KEY con esta única línea');
  console.log('4. Guarda el archivo y reinicia tu aplicación con npm run dev');
  
} catch (error) {
  console.error('Error al leer el archivo .env:', error.message);
} 