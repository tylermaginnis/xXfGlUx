/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/xXfGlUx' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/xXfGlUx/' : '',
};

export default nextConfig;






