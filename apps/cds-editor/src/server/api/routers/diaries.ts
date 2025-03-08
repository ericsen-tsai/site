import {
  createDiaryEntry,
  deleteDiaryEntry,
  getDiaryEntries,
  getDiaryEntryById,
  updateDiaryEntry
} from "@erichandsen/dal";
import { TRPCError } from "@trpc/server";
import z from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const diariesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
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
    }),
  getById: privateProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return await getDiaryEntryById(input.id);
  }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        heroImageUrl: z.string().optional(),
        date: z.date()
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      await updateDiaryEntry(id, {
        ...rest,
        heroImageUrl: rest.heroImageUrl ?? null,
        date: rest.date.toISOString()
      });
    }),
  delete: privateProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await deleteDiaryEntry(input.id);
  })
});
