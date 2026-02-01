import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
