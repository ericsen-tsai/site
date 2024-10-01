import {
  createGuestbookComment,
  getGuestbookCommentsWithUserImages,
} from "@/lib/db-access/guestbook-comments";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";

export const guestbookCommentsRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    return getGuestbookCommentsWithUserImages();
  }),
  create: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      return createGuestbookComment(input, userId);
    }),
});
