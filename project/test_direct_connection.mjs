// Script para probar la conexión directamente con la API key
import { createClient } from '@supabase/supabase-js';

// Usa directamente las credenciales (solo para pruebas)
const supabaseUrl = 'https://vzjysbwsqmiqljpwpjvt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMzAwMDAsImV4cCI6MTcxNjkzNDgwMH0.examplekeyfordemopurposesdontusethis';

async function testDirectConnection() {
  console.log('Probando conexión directa a Supabase...');
  
  // Crear cliente
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Intentar consultar la tabla products
    const { data, error } = await supabase.from('products').select('id, name').limit(3);
    
    if (error) {
      console.error('❌ Error al conectar:', error.message);
      
      if (error.message.includes('relation "products" does not exist')) {
        console.log('\n⚠️ La tabla "products" no existe. Ejecuta el script SQL primero.');
      }
    } else {
      console.log('✅ Conexión exitosa!');
      
      if (data && data.length > 0) {
        console.log('\n📋 PRODUCTOS ENCONTRADOS:', data.length);
        data.forEach(product => {
          console.log(`  - ${product.name} (ID: ${product.id})`);
        });
      } else {
        console.log('⚠️ No se encontraron productos. Ejecuta el script SQL para crear datos de ejemplo.');
      }
    }
  } catch (err) {
    console.error('❌ Error inesperado:', err.message);
  }
}

// Ejecutar la prueba
testDirectConnection(); 