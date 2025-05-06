// Script para verificar la conexión con Supabase
// Ejecutar con: node check_supabase_connection.mjs

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno
config();

// Función para leer y corregir el formato de la API key
function getFixedSupabaseKey() {
  try {
    // Leer el archivo .env directamente
    const envFile = readFileSync('.env', 'utf8');
    const lines = envFile.split('\n');
    
    // Buscar todas las líneas que contienen VITE_SUPABASE_ANON_KEY
    const keyLines = lines.filter(line => line.includes('VITE_SUPABASE_ANON_KEY'));
    
    if (keyLines.length === 0) {
      console.error('❌ No se encontró VITE_SUPABASE_ANON_KEY en el archivo .env');
      return null;
    }
    
    // Combinar todas las líneas en una sola
    let combinedKey = '';
    keyLines.forEach(line => {
      // Si es la primera línea, obtener la parte después del signo igual
      if (line.includes('=')) {
        combinedKey += line.split('=')[1].trim();
      } else {
        // Si no, agregar toda la línea
        combinedKey += line.trim();
      }
    });
    
    console.log('✅ API key recuperada y corregida de formato');
    return combinedKey;
  } catch (error) {
    console.error('❌ Error al leer el archivo .env:', error.message);
    return null;
  }
}

// Obtener la URL y la clave de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKeyFromEnv = process.env.VITE_SUPABASE_ANON_KEY;
const fixedSupabaseKey = getFixedSupabaseKey();

console.log('\n📊 INFORME DE CONFIGURACIÓN DE SUPABASE');
console.log('---------------------------------------');
console.log('URL de Supabase:', supabaseUrl ? '✅ Configurada' : '❌ No configurada');
console.log('API Key desde process.env:', supabaseKeyFromEnv ? '✅ Disponible' : '❌ No disponible');

if (supabaseKeyFromEnv && supabaseKeyFromEnv.includes('\n')) {
  console.log('⚠️ ADVERTENCIA: La API key contiene saltos de línea, lo que causará problemas.');
  console.log('   Corrige el formato siguiendo las instrucciones en fix_env_instructions.md');
}

// Crear cliente con la clave corregida si está disponible
const supabaseKey = fixedSupabaseKey || supabaseKeyFromEnv;

if (supabaseUrl && supabaseKey) {
  console.log('\n🔄 PROBANDO CONEXIÓN A SUPABASE');
  console.log('-------------------------------');
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Probar la conexión
  async function testConnection() {
    try {
      console.log('Intentando conectar con Supabase...');
      const { data, error } = await supabase.from('products').select('id, name').limit(3);
      
      if (error) {
        console.error('❌ Error al conectar con Supabase:', error.message);
        
        if (error.message.includes('Invalid API key')) {
          console.error('\n🔧 SOLUCIÓN RECOMENDADA:');
          console.error('1. Abre el archivo .env');
          console.error('2. Asegúrate de que VITE_SUPABASE_ANON_KEY esté en una sola línea');
          console.error('3. Reinicia la aplicación con npm run dev');
        } else if (error.message.includes('relation "products" does not exist')) {
          console.error('\n🔧 SOLUCIÓN RECOMENDADA:');
          console.error('1. Ejecuta el script SQL para crear la tabla "products"');
          console.error('2. Sigue las instrucciones en instrucciones_migracion.md');
        }
      } else {
        console.log('✅ Conexión exitosa!');
        
        if (data && data.length > 0) {
          console.log('\n📋 PRODUCTOS ENCONTRADOS:', data.length);
          data.forEach(product => {
            console.log(`  - ${product.name} (ID: ${product.id})`);
          });
        } else {
          console.log('⚠️ No se encontraron productos. Debes ejecutar el script SQL.');
        }
      }
    } catch (err) {
      console.error('❌ Error inesperado:', err.message);
    }
  }
  
  testConnection();
} else {
  console.error('\n❌ No se puede crear el cliente de Supabase. Faltan las variables necesarias.');
} 