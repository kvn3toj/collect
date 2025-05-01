#!/bin/bash

# Configuración de variables
TARGET_WEB_ROOT="/home/u841395440/domains/aretrust.store/public_html"
TEMP_GIT_BACKUP="/home/u841395440/git_backup"
BUILD_DIR="out"

# Función para manejar errores
handle_error() {
    echo "Error: $1"
    exit 1
}

# Verificar que estamos en la rama main
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    handle_error "No estás en la rama main. Por favor, cambia a main antes de desplegar."
fi

# Asegurarse de que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    handle_error "Hay cambios sin commitear. Haz commit o stash antes de desplegar."
fi

# Crear build
echo "🏗️ Creando build..."
npm run build || handle_error "Fallo en el build"

# Verificar que el build se creó correctamente
if [ ! -d "$BUILD_DIR" ]; then
    handle_error "El directorio de build no existe"
fi

# Backup del directorio .git si existe
echo "📦 Haciendo backup del repositorio git..."
if [ -d "$TARGET_WEB_ROOT/.git" ]; then
    rm -rf "$TEMP_GIT_BACKUP"
    mv "$TARGET_WEB_ROOT/.git" "$TEMP_GIT_BACKUP" || handle_error "No se pudo hacer backup del .git"
fi

# Limpiar el directorio público
echo "🧹 Limpiando directorio público..."
find "$TARGET_WEB_ROOT" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copiar archivos del build
echo "📋 Copiando archivos..."
cp -r $BUILD_DIR/* "$TARGET_WEB_ROOT/" || handle_error "No se pudieron copiar los archivos"

# Restaurar el repositorio git
if [ -d "$TEMP_GIT_BACKUP" ]; then
    echo "🔄 Restaurando repositorio git..."
    mv "$TEMP_GIT_BACKUP" "$TARGET_WEB_ROOT/.git" || handle_error "No se pudo restaurar el .git"
fi

# Establecer permisos correctos
echo "🔒 Configurando permisos..."
find "$TARGET_WEB_ROOT" -type d -exec chmod 755 {} +
find "$TARGET_WEB_ROOT" -type f -exec chmod 644 {} +

echo "✅ Despliegue completado exitosamente!" 