/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn0-production-images-kly.akamaized.net',
      },
      {
        protocol: 'https',
        hostname: 'synchronizefestival.com',
      },
    ],
    domains: ['www.themealdb.com', 'randomuser.me'],
  },
};

export default nextConfig;
