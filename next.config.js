/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/stytch/:path*",
        destination: "https://api.stytch.com/:path*", // Proxy to Stytch API
      },
    ];
  },
};

module.exports = nextConfig;
