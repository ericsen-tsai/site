import { createJiti } from "jiti";
import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti.esmResolve("@erichandsen/env");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    authInterrupts: true
  }
};

export default nextConfig;
