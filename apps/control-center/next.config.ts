import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  // Silenciar erro do Turbopack ao detectar config do Webpack
  turbopack: {},
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
