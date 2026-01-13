/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  
  // Disable telemetry for faster builds
  telemetry: false,
  
  // Optimize for build performance
  experimental: {
    optimizePackageImports: ['@prisma/client', 'better-auth'],
  },
};

export default nextConfig;
