"use server";

import { deleteAllGuestbookComments } from "@/lib/db-access/guestbook-comments";

const deleteAllComments = async () => {
  await deleteAllGuestbookComments();
};

export default deleteAllComments;
