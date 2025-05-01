#!/bin/bash

# Verificar que deploy.sh existe
if [ ! -f "deploy.sh" ]; then
    echo "Error: deploy.sh not found!"
    exit 1
fi

# Hacer deploy.sh ejecutable
chmod +x deploy.sh

# Ejecutar deploy.sh 