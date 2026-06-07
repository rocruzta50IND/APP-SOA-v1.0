import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { dir }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(dir, 'node_modules/react'),
      'react-dom': path.resolve(dir, 'node_modules/react-dom'),
    };
    return config;
  },
  turbopack: {},
};

export default nextConfig;
