import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true, // Note: This might be 'experimental.reactCompiler' depending on version, keeping as is
  serverExternalPackages: ["@imgly/background-removal-node", "sharp"],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });

    if (isServer) {
      config.externals = [...(config.externals || []), "sharp", "@imgly/background-removal-node"];
    }

    return config;
  },
};

export default withPWA(nextConfig);
