/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['coinicons-api.vercel.app', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
