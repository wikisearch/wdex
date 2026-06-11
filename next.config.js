const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "mangadex.org",
        },
      ],
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    // Currently having a lot of errors, just ignore them for now //
    // [kamii0909]: ping me if you upgrade eslint to 9 (btw only next 15 is
    // compatible with eslint 9), I will write the flat config instead.
    eslint: {
      ignoreDuringBuilds: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
      // Custom Webpack config here
      // Example: Add aliases
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, 'src'),
      };

      // Example: Custom loader
      // config.module.rules.push({
      //   test: /\.svg$/,
      //   use: ['@svgr/webpack'],
      // });

      // Example: Bundle analyzer (uncomment to use)
      // if (process.env.ANALYZE === 'true') {
      //   const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      //   config.plugins.push(new BundleAnalyzerPlugin());
      // }

      return config;
    },
  };

  // You may want to use a more robust revision to cache
  // files more efficiently.
  // A viable option is `git rev-parse HEAD`.
  const revision = crypto.randomUUID();

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      cacheOnNavigation: false,
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      additionalPrecacheEntries: [{ url: "/ngoai-tuyen", revision }],
      exclude: [/^\/api\//],
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};
