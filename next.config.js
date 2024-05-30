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

  assetPrefix: process.env.NODE_ENV !== 'production'
   ? 'https://grxxn.github.io/play_with_economy'
   : "",

   basePath: "/play_with_economy"
};

module.exports = nextConfig;
