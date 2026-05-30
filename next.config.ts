import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': [
      './drizzle/**/*', // Deine SQL-Migrationen
    ],
  },
};

export default nextConfig;
