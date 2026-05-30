import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': [
      './drizzle/**/*', // WICHTIG: Damit die .sql-Dateien im Container landen
    ],
  },
};

export default nextConfig;
