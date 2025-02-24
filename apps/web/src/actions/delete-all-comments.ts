"use server";

import { deleteAllGuestbookComments } from "@erichandsen/dal";

const deleteAllComments = async () => {
  await deleteAllGuestbookComments();
};

export default deleteAllComments;
