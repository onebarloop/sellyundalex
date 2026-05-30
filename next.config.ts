import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': [
      './drizzle.config.ts', // Die Drizzle-Konfigurationsdatei
      './src/**/*', // Der komplette Quellcode inkl. Auth, Schema und Seed
    ],
  },
};

export default nextConfig;
