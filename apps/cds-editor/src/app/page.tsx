import { api } from "@/trpc/server";

import { DiaryForm } from "../components/cds-form";
import { DiaryDrawer } from "../components/diary-drawer";

export default async function CDSEditorPage() {
  const diaries = await api.diaries.getAll();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Camino de Santiago</h1>
      <DiaryForm />
      <DiaryDrawer diaries={diaries} />
    </main>
  );
}
