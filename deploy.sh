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

# Crear directorio público si no existe
echo "Creating public directory..."
mkdir -p public_html

# Mover archivos construidos al directorio público
echo "Moving built files to public directory..."
cp -r .next public_html/
cp -r public/* public_html/
cp package.json public_html/
cp package-lock.json public_html/

# Limpiar archivos innecesarios
echo "Cleaning up..."
rm -rf node_modules

echo "Deployment completed!" 