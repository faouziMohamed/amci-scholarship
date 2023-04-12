import { createSecureHeaders } from 'next-secure-headers';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'long',
};
const lastBuild = new Date(new Date().toUTCString()).toLocaleString(
  'en-US',
  options,
);
const lastBuildIso = new Date().toISOString();

/** @type {import("next").NextConfig} **/
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  compiler: {
    styledComponents: { ssr: true, displayName: true },
  },
  experimental: {
    appDir: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...createSecureHeaders(),
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  output: 'standalone',
  poweredByHeader: false,
  publicRuntimeConfig: { lastBuild, lastBuildIso },
  reactStrictMode: true,
  // SVGR
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: { typescript: true, icon: true },
          },
        ],
      },
    );
    return config;
  },
};

export default nextConfig;
