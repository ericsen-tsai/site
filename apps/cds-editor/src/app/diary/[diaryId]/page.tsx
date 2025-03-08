import Link from "next/link";

import { DiaryForm } from "@/components/cds-form";
import { api } from "@/trpc/server";

async function DiaryPage({ params }: { params: Promise<{ diaryId: string }> }) {
  const { diaryId } = await params;
  const diary = await api.diaries.getById({ id: Number.parseInt(diaryId) });
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        <Link href="/">Camino de Santiago</Link>
      </h1>
      <DiaryForm diary={diary} />
    </main>
  );
}

export default DiaryPage;
