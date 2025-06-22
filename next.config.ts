import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: [
      "app",
      "data",
      "constants",
      "config",
      "components",
      "hooks",
      "lib",
      "services",
      "utils",
      "types",
    ],
  },
};

export default nextConfig;
