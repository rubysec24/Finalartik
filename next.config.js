/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ["picsum.photos"],
  },
  webpack: (config, { isServer }) => {
    // SVG dosyalarını React bileşenleri olarak kullanabilmek için
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Chunk yükleme zaman aşımı süresini artır
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  }
};

module.exports = nextConfig; 