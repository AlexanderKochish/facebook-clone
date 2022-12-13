/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
