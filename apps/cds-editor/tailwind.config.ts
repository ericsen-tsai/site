import sharedConfig from "@erichandsen/tailwind-config";
import { type Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = withUt({
  content: ["./src/**/*.{js,ts,jsx,tsx,md,mdx}", "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig]
});

export default config;
