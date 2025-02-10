module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudinary.com",
        pathname: "/dxa54qfxx/image/upload/v1739226905",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};
