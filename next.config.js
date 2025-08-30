/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurazioni specifiche per la build
  typescript: {
    // Ignora gli errori TypeScript durante la build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora gli errori ESLint durante la build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
