/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
// When deploying to `<username>.github.io` root, basePath stays empty.
// When deploying to `<username>.github.io/<repo>`, set BASE_PATH=/<repo> in GitHub Actions.
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
