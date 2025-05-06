# Lista de verificación para la implementación

Para asegurar que la funcionalidad de edición de precios funcione correctamente, sigue esta lista de verificación:

## 1. Preparación de Supabase

- [ ] Ejecutar el script SQL de migración en Supabase (usando el SQL Editor)
- [ ] Verificar que la tabla `products` se haya creado con todos los campos
- [ ] Confirmar que los datos de ejemplo se hayan insertado correctamente

## 2. Configuración del entorno

- [ ] Corregir el formato de la API key en el archivo `.env` (ver `fix_env_instructions.md`)
- [ ] Reiniciar el servidor de desarrollo para aplicar los cambios

## 3. Prueba de funcionalidad

- [ ] Navegar a `/admin/products` en la aplicación
- [ ] Verificar que los productos se cargan correctamente desde Supabase
- [ ] Hacer clic en el icono de edición (lápiz) de cualquier producto
- [ ] Modificar el precio en el diálogo
- [ ] Hacer clic en "Guardar" y verificar:
   - [ ] El mensaje de carga aparece mientras se procesa la solicitud
   - [ ] El toast de confirmación aparece al completar
   - [ ] El precio actualizado se refleja en la tabla

## 4. Verificación de errores

- [ ] Verificar la consola del navegador para detectar posibles errores
- [ ] Probar con valores límite (0, números muy grandes) para verificar la validación
- [ ] Recargar la página para confirmar la persistencia de los cambios

## Solución de problemas comunes

1. **Error "Invalid API key"**: Revisar el formato de la API key en `.env`
2. **Error "Table not found"**: Verificar que el script SQL se haya ejecutado correctamente
3. **No se cargan los productos**: Comprobar la conexión a Supabase y las políticas RLS
4. **Cambios no persistentes**: Verificar que la mutación de React Query esté configurada correctamente 