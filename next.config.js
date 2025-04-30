/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configuración del dominio
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://aretrust.store' : '',
  basePath: '',
  // Deshabilitar la generación de archivos de desarrollo en producción
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
}

module.exports = nextConfig 