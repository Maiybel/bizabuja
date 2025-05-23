import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ["maps.googleapis.com"],
  },
};

export default nextConfig;
