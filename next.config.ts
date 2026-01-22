import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms-images.udemycdn.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'elearningnew.cybersoft.edu.vn',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cybersoft.edu.vn',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '**',
      },
    ]
  }
};

export default nextConfig;
