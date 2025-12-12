import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //disabled for development
  reactStrictMode: false,
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/book',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
