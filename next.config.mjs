const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      resource: /[\\/]src[\\/]app[\\/]globals\.css$/i,
      enforce: "pre",
      use: ["@tailwindcss/turbopack"],
    });
    return config;
  },
};

export default nextConfig;
