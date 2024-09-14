import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    WAKA_TIME_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    WAKA_TIME_API_KEY: process.env.WAKA_TIME_API_KEY,
  },
});
