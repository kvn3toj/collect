/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['aretrust.store'],
  },
  // Configuración del dominio
  basePath: '',
  // Optimizaciones de producción
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
}

module.exports = nextConfig 