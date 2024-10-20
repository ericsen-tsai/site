import { createJiti } from "jiti";
import { withContentlayer } from "next-contentlayer";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti.esmResolve("@erichandsen/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

export default withContentlayer(nextConfig);
