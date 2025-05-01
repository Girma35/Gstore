const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['fakestoreapi.com'],
  },
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
