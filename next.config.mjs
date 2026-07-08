/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '0.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iutirlaoficial.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  trailingSlash: true,
  serverExternalPackages: [
    '@mdx-js/loader',
    'rehype-pretty-code',
    'rehype-highlight',
    'rehype-autolink-headings',
    'rehype-slug',
    'remark-gfm',
    'sharp',
    'next-mdx-remote',
    'framer-motion'
  ],
};

export default nextConfig;
