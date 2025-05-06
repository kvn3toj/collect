# Resumen de soluciones para ARETrust Store

A continuación se presenta un resumen de las soluciones para los problemas detectados en la aplicación ARETrust Store:

## 1. Error "EADDRINUSE" en el puerto 3001 del backend

El backend intentaba iniciarse en el puerto 3001, pero éste ya estaba en uso. Para solucionar este problema:

```bash
# Identificar el proceso que ocupa el puerto
lsof -i :3001

# Terminar el proceso (sustituye [PID] por el ID del proceso)
kill -9 [PID]

# Reiniciar el backend
cd aretrust-backend
npm run start:dev
```

## 2. Errores 404 en las peticiones a la API

Las peticiones a endpoints como `/cart`, `/products` y `/me` están fallando con errores 404. Esto puede deberse a:

1. El backend no está en ejecución
2. El proxy en `vite.config.ts` no está configurado correctamente
3. Estamos intentando acceder a rutas que no existen

Solución:
- Asegurarse de que el backend está en ejecución (paso 1)
- Verificar que los endpoints existen en el backend
- Para desarrollo, acceder directamente a las páginas que no requieren autenticación

## 3. Error "Invalid API key" en Supabase

Este error suele ocurrir cuando la clave API de Supabase tiene un formato incorrecto. Para solucionarlo:

1. Seguir las instrucciones en `corregir_clave_supabase.md`
2. Ejecutar el script `fix_supabase_key.js` si es necesario

## 4. Falta la tabla "products" en Supabase

Para crear esta tabla:

1. Seguir las instrucciones en `instrucciones_ejecutar_productos.md`
2. Ejecutar el script SQL `setup_products_table.sql`

## 5. Acceso directo a páginas específicas

Para evitar problemas con la autenticación durante el desarrollo, puedes acceder directamente a las páginas principales:

- Página de administración de productos: `http://localhost:5174/admin/products`
- Página principal: `http://localhost:5174/`

## Pasos a seguir

1. Liberar el puerto 3001
2. Reiniciar el backend
3. Corregir el formato de la clave API de Supabase
4. Crear la tabla de productos en Supabase
5. Acceder directamente a la página de administración de productos

Con estos pasos, deberías poder ver la página de administración de productos y realizar operaciones como actualizar precios correctamente.

## Consideraciones adicionales

- En un entorno de producción, se deben habilitar las políticas RLS en Supabase para proteger los datos
- La autenticación debe configurarse correctamente para restringir el acceso a las páginas de administración
- Las variables de entorno deben configurarse adecuadamente para cada entorno (desarrollo, producción) 