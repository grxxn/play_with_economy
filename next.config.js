/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  reactStrictMode: false,
  async rewrites() {
    return [ 
      {
        source: '/v1/:path*',
        destination: 'https://openapi.naver.com/v1/:path*',
      },
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['@acme/ui'],
  },
};

module.exports = nextConfig;
