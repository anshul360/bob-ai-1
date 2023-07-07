/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['chrome-aws-lambda']
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   //config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

  //   // This exists to keep the package size below the lambda 50mb zipped limit
  //   if (isServer) {
  //     if (!dev) {
  //       config.externals = ['chrome-aws-lambda'];
  //     }
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
