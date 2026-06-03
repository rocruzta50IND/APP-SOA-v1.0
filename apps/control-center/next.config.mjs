/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignorar a pasta de templates e outros arquivos voláteis do watcher do Next.js
      config.watchOptions = {
        ignored: [
          '**/node_modules/**',
          '**/.templates/**',
          '**/out/**',
          '**/.next/**'
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
