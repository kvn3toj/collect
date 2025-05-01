#!/bin/bash

# Crear directorio si no existe
mkdir -p public/images/products

# Descargar imágenes de ejemplo
# Anillo con esmeralda cabujón
curl -o public/images/products/anillo-cabujon-circones.jpg "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80"

# Aretes de plata con esmeraldas
curl -o public/images/products/par-aretes-plata.jpg "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"

# Imágenes adicionales para los productos existentes
curl -o public/images/products/anillo-esmeralda-clasico.jpg "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80"
curl -o public/images/products/collar-esmeralda-gota.jpg "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"
curl -o public/images/products/aretes-esmeralda-vintage.jpg "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"

echo "Imágenes descargadas exitosamente" 