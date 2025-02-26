import { db, desc, eq, guestbookComments, inArray, users } from "@erichandsen/db";

export const getGuestbookCommentsWithUserImages = async () => {
  const [comments, guestbookUsers] = await Promise.all([
    db.select().from(guestbookComments).orderBy(desc(guestbookComments.createdAt)),
    db
      .select()
      .from(users)
      .where(inArray(users.id, db.select({ id: guestbookComments.userId }).from(guestbookComments)))
  ]);

  return comments.map((comment) => {
    const user = guestbookUsers.find((guestbookUser) => guestbookUser.id === comment.userId);
    return {
      ...comment,
      userImage: user?.image,
      userName: user?.name,
      userRole: user?.role
    };
  });
};

export const createGuestbookComment = async (comment: string, userId: string) => {
  const guestbookUsers = await db.select().from(users).where(eq(users.id, userId));
  const userImage = guestbookUsers[0]?.image;
  const userName = guestbookUsers[0]?.name;
  const userRole = guestbookUsers[0]?.role;

  return {
    ...(
      await db
        .insert(guestbookComments)
        .values({
          message: comment,
          userId
        })
        .returning()
    )[0],
    userImage,
    userName,
    userRole
  };
};

export const deleteAllGuestbookComments = async () => {
  await db.delete(guestbookComments);
};
