/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {}) => {
    config.resolve.fallback = {
      'cohere-ai': false,
      '@visheratin/web-ai': false,
      '@visheratin/web-ai-node': false,
    };
    return config;
  },
    headers: async () => {
      return [
        {
          source: '/api/(.*)',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true'},
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value:  'Origin, X-Requested-With, Content-Type, Accept' },
          ],
        },
      ]
    },
}

module.exports = nextConfig
