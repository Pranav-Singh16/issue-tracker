// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
  // Add the images configuration
  images: {
    domains: ["lh3.googleusercontent.com"], // Add this domain to allow images from Google
  },
};

module.exports = nextConfig;
