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
    POSTGRES_PASSWORD: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_MAPBOX_STYLE_ID: z.string().min(1),
    NEXT_PUBLIC_MAPBOX_USER_ID: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_MAPBOX_STYLE_ID: process.env.NEXT_PUBLIC_MAPBOX_STYLE_ID,
    NEXT_PUBLIC_MAPBOX_USER_ID: process.env.NEXT_PUBLIC_MAPBOX_USER_ID
  },
  emptyStringAsUndefined: true
});
