/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  i18n: {
    locales: ['hu'],
    defaultLocale: 'hu'
  },
  async rewrites() {
    return [
      {
        source: '/bejegyzesek',
        destination: '/bejegyzesek/1',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/([0-9]*\/[0-9]*\/[0-9]*)/:slug',
        destination: '/posts/:slug',
        permanent: true,
      }
    ]
  },
  images: {
    domains: ['mengerblogcom.files.wordpress.com']
  }
});
