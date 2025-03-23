import { getDiaryEntries } from "@erichandsen/dal";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const diariesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await getDiaryEntries();
  })
});
