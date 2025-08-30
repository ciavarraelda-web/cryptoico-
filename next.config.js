/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurazioni specifiche per la build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
