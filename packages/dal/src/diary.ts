import { db, desc, diaries, eq, type InferSelectModel } from "@erichandsen/db";

export type DiaryEntry = InferSelectModel<typeof diaries>;

export const getDiaryEntries = async () => {
  const entries = await db.select().from(diaries).orderBy(desc(diaries.createdAt));
  return entries;
};

export const getDiaryEntryById = async (id: number) => {
  const entry = await db.select().from(diaries).where(eq(diaries.id, id));
  return entry[0];
};

export const createDiaryEntry = async (
  entry: Omit<DiaryEntry, "id" | "createdAt" | "updatedAt">
) => {
  const newEntry = await db.insert(diaries).values(entry).returning();
  return newEntry[0];
};

export const deleteDiaryEntry = async (id: number) => {
  await db.delete(diaries).where(eq(diaries.id, id));
};

export const updateDiaryEntry = async (
  id: number,
  entry: Omit<DiaryEntry, "id" | "createdAt" | "updatedAt">
) => {
  await db
    .update(diaries)
    .set({ ...entry, updatedAt: new Date() })
    .where(eq(diaries.id, id));
};
