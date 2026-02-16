import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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

export default nextConfig;
