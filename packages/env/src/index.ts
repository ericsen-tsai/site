import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

export const env = createEnv({
  skipValidation: !!process.env.CI,
  extends: [vercel()],
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development")
  },
  server: {
    WAKATIME_API_KEY: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    AUTH_GITHUB_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
    POSTGRES_URL: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1)
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD
  },
  emptyStringAsUndefined: true
});
