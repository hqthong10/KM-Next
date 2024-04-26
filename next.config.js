/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['@nextui-org/react']
    }
};

module.exports = nextConfig;
