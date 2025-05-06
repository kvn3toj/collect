require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Extraer variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Verificar si las variables están definidas
console.log('URL de Supabase:', supabaseUrl ? 'Configurada' : 'No configurada');
// Mostrar solo los primeros 15 caracteres de la clave por seguridad
console.log('API Key de Supabase:', supabaseKey ? `Configurada (primeros caracteres: ${supabaseKey.substring(0, 15)}...)` : 'No configurada');

// Crear cliente si ambas variables están definidas
if (supabaseUrl && supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Probar la conexión intentando obtener los productos
  async function testConnection() {
    try {
      console.log('Intentando conectar con Supabase...');
      const { data, error } = await supabase.from('products').select('id').limit(1);
      
      if (error) {
        console.error('Error al conectar con Supabase:', error.message);
        if (error.message.includes('Invalid API key')) {
          console.error('⚠️ La API key parece ser inválida. Verifica que esté correctamente formateada en el archivo .env');
        } else if (error.message.includes('relation "products" does not exist')) {
          console.error('⚠️ La tabla "products" no existe. Ejecuta el script SQL para crearla.');
        }
      } else {
        console.log('Conexión exitosa!');
        console.log('Datos obtenidos:', data);
      }
    } catch (err) {
      console.error('Error inesperado:', err.message);
    }
  }
  
  testConnection();
} else {
  console.error('⚠️ Faltan las variables de entorno necesarias para conectar con Supabase.');
} 