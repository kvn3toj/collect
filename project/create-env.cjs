const fs = require('fs');

const envContent = 
`DATABASE_URL="postgresql://postgres.vzjysbwsqmiqljpwpjvt:Dios-Es_Mi_Guia@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=no-verify"
DIRECT_URL="postgresql://postgres:Dios-Es_Mi_Guia@db.vzjysbwsqmiqljpwpjvt.supabase.co:5432/postgres?sslmode=no-verify"
SUPABASE_URL="https://vzjysbwsqmiqljpwpjvt.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6anlzYndzcW1pcWxqcHdwanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMzc5ODksImV4cCI6MjAyOTcxMzk4OX0.YSfO7Tic91NcIK4d3WHQB_v-zSoXe_T8eVxqC-BL_HA"
JWT_SECRET="super-secret-jwt-key-for-aretrust-app"`;

try {
  fs.writeFileSync('.env', envContent);
  console.log('Archivo .env creado correctamente.');
} catch (error) {
  console.error('Error al crear el archivo .env:', error);
} 