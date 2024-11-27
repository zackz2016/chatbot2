/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        net: false,
        tls: false,
        fs: false,
        perf_hooks: false,
        child_process: false,
      };
    }
    return config;
  },
  transpilePackages: ['openai'],
}

module.exports = nextConfig 