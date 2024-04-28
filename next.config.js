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
        source: '/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ]
  }
};

module.exports = nextConfig;
