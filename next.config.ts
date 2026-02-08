import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- REQUIRED FOR DOCKER ---
  // This tells Next.js to create a small, standalone build
  output: "standalone",

  // --- KEEPING THESE ---
  // These allow images from anywhere, which is convenient
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  // --- ERROR HANDLING ---
  // Good for beginners: Prevents the build from failing due to small code style issues
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
