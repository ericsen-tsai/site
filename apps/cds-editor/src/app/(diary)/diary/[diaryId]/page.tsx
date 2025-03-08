import { DiaryForm } from "@/components/cds-form";
import { api } from "@/trpc/server";

async function DiaryPage({ params }: { params: Promise<{ diaryId: string }> }) {
  const { diaryId } = await params;
  const diary = await api.diaries.getById({ id: Number.parseInt(diaryId) });
  return <DiaryForm diary={diary} />;
}

export default DiaryPage;
