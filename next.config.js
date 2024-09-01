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
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
      {
        source: '/user/:path*',
        destination: 'http://localhost:8080/user/:path*',
      }
    ]
  },
};

module.exports = nextConfig;
