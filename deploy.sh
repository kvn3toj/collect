#!/bin/bash

# Imprimir versiones
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Instalar dependencias
echo "Installing dependencies..."
npm install

# Construir la aplicación
echo "Building the application..."
npm run build

# Mover los archivos generados al directorio público
echo "Moving files to public directory..."
cp -r out/* .
cp public/.htaccess .

# Limpiar archivos innecesarios
echo "Cleaning up..."
rm -rf node_modules .next out src

echo "Deployment completed!" 