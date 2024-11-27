/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'edge',
  },
  // 确保 OpenAI 包可以在 Edge Runtime 中使用
  transpilePackages: ['openai'],
}

module.exports = nextConfig 