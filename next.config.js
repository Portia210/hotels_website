/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withNextIntl = require("next-intl/plugin")(
  "./i18n.js"
);

module.exports = withNextIntl(nextConfig);