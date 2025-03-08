import { createJiti } from "jiti";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti.esmResolve("@erichandsen/env");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default withContentlayer(nextConfig);
