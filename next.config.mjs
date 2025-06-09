import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import fs from 'fs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
  distDir: 'out',
  reactStrictMode: true,
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3008/api/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };

      // Add MiniCssExtractPlugin
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[id].[contenthash].css',
        })
      );
    }

    // Copy resume.pdf to the output directory during build
    if (isServer) {
      const publicDir = path.join(process.cwd(), 'public');
      const outputDir = path.join(process.cwd(), '.next', 'public');
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      if (fs.existsSync(path.join(publicDir, 'resume.pdf'))) {
        fs.copyFileSync(
          path.join(publicDir, 'resume.pdf'),
          path.join(outputDir, 'resume.pdf')
        );
      }
    }

    // Add CSS extraction plugin configuration
    if (!isServer) {
      config.module.rules.forEach((rule) => {
        const { oneOf } = rule;
        if (oneOf) {
          oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes('_app')) return;
            one.issuer.and = [path.resolve(__dirname)];
          });
        }
      });
    }

    return config;
  },
}

export default nextConfig;
