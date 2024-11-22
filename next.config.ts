import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dribbble.com", // Tambahkan domain yang Anda inginkan
        pathname: "/**", // Ini berarti semua path dari domain tersebut
      },
    ],
  },
};

export default nextConfig;
