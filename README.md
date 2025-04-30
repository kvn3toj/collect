# ARE Trüst - Sitio Web de Inversión en Esmeraldas

Sitio web estático para ARE Trüst, construido con Next.js y Material-UI.

## Requisitos

- Node.js 18.x o superior
- npm 9.x o superior

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd aretrust-web
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
aretrust-web/
├── public/              # Archivos estáticos
│   └── images/         # Imágenes del sitio
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de Next.js
│   └── theme/         # Configuración del tema MUI
├── next.config.js     # Configuración de Next.js
└── package.json       # Dependencias y scripts
```

## Construcción para Producción

1. Construye el sitio:
```bash
npm run build
```

2. Los archivos estáticos se generarán en la carpeta `out/`

## Despliegue en Hostinger

1. Construye el sitio con `npm run build`
2. Sube todo el contenido de la carpeta `out/` a la carpeta raíz de tu hosting (normalmente `public_html`)
3. Asegúrate de que el archivo `.htaccess` esté configurado correctamente para manejar las rutas de Next.js

## Tecnologías Utilizadas

- Next.js 14
- Material-UI 5
- TypeScript
- React 18

## Características

- Diseño responsivo
- Tema oscuro con acentos dorados
- Optimizado para SEO
- Carga rápida gracias a la generación estática
- Interfaz moderna y elegante

## Mantenimiento

Para actualizar el contenido:

1. Modifica los archivos en `src/pages/` para las páginas principales
2. Actualiza los componentes en `src/components/` según sea necesario
3. Añade nuevas imágenes en `public/images/`
4. Reconstruye el sitio con `npm run build`
5. Sube los nuevos archivos al hosting

## Licencia

Todos los derechos reservados © ARE Trüst # collect
