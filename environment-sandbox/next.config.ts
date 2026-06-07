import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
};

export default nextConfig;
