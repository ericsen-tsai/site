"use server";

import { deleteAllGuestbookComments } from "@/lib/db-access/guestbook-comments";

export const deleteAllComments = async () => {
  await deleteAllGuestbookComments();
};
