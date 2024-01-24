/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.travelor.com", "www.booking.com", "az712897.vo.msecnd.net", "cf.bstatic.com"],
  },
};

const withNextIntl = require("next-intl/plugin")(
  "./i18n.js"
);

module.exports = withNextIntl(nextConfig);