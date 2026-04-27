import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cyera-insights',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
