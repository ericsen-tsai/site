import { createDiaryEntry, getDiaryEntries } from "@erichandsen/dal";
import { TRPCError } from "@trpc/server";
import z from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const diariesRouter = createTRPCRouter({
  getAll: privateProcedure.query(async () => {
    return await getDiaryEntries();
  }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        heroImageUrl: z.string().optional(),
        date: z.date()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated"
        });
      }
      return await createDiaryEntry({
        ...input,
        heroImageUrl: input.heroImageUrl ?? null,
        date: input.date.toISOString()
      });
    })
});
