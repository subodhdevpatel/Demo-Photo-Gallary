/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["testprojapr.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
