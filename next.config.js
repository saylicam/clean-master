/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // génère /out
  trailingSlash: true,       // /page/ -> /page/index.html (Apache friendly)
  images: { unoptimized: true }, // pas d’optims côté serveur
};
module.exports = nextConfig;
