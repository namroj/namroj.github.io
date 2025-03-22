/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
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
  experimental: {
    serverMinification: true,
    serverComponentsExternalPackages: [
      '@mdx-js/loader',
      'rehype-pretty-code',
      'rehype-highlight',
      'rehype-autolink-headings',
      'rehype-slug',
      'remark-gfm',
      'sharp'
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude unnecessary dependencies from server bundle
      config.externals = [...(config.externals || []), {
        'next-mdx-remote': 'commonjs next-mdx-remote',
        'framer-motion': 'commonjs framer-motion',
        'sharp': 'commonjs sharp'
      }];
    }
    return config;
  },
};

export default nextConfig;
