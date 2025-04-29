import withPWA from 'next-pwa';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'img.otruyenapi.com',
        port: '',
        pathname: '/uploads/comics/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'i.imgur.com',
        port: undefined,
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'congthanh.vn',
        port: undefined,
        pathname: '/**',
      },
    ],
    domains: ["img.otruyenapi.com"],
    minimumCacheTTL: 60,
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);
