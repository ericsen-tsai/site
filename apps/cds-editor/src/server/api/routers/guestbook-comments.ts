import { createGuestbookComment, getGuestbookCommentsWithUserImages } from "@erichandsen/dal";
import { TRPCError } from "@trpc/server";
import z from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const guestbookCommentsRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    return await getGuestbookCommentsWithUserImages();
  }),
  create: privateProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user?.id;
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated"
      });
    }
    return await createGuestbookComment(input, userId);
  })
});
