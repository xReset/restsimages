/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/restsimages.pics' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/restsimages.pics' : ''
}

module.exports = nextConfig 