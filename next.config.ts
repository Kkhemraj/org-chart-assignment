import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hel1.your-objectstorage.com",
        port: "",
        pathname: "/**", // allows all paths under this domain
      },
      // optional – if you have placeholder images
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

module.exports = nextConfig;
