/** @type {import('next').NextConfig} */
const nextConfig = {
  // Node process mode (next start / PM2). Do NOT set `output: 'export'`.
  // Faz 2: middleware, server actions, API routes require a Node server.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // CDN / kendi sunucu görselleri — domain'leri canlıya alınca güncelle
      // {
      //   protocol: "https",
      //   hostname: "cdn.selvilerkuyumculuk.com",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "images.selvilerkuyumculuk.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

module.exports = nextConfig;
