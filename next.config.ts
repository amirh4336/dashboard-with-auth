import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.digiato.com",
      },
    ],
  },
};

export default nextConfig;
