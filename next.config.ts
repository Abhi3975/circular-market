const nextConfig: import('next').NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/circular-market',
  trailingSlash: true,
};

export default nextConfig;
