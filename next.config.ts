import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
      allowedOrigins: [
        'localhost:3000',
        '127.0.0.1:3000',
        '192.168.1.9:3000',
        '192.168.*:3000',
        '192.168.*',
        '10.*:3000',
        '10.*',
        '172.16.*:3000',
        '172.16.*',
        '*.local:3000',
        '*.local',
      ],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: false,
};

export default nextConfig;