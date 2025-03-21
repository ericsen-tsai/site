import { SECTION_NAV_ITEMS } from "@/constants/link";
import { api } from "@/trpc/server";

import DiaryCard from "./diary-card";

async function BuenCamino() {
  const caminoDiaries = await api.diaries.getAll();
  const latestDiary = caminoDiaries.toSorted(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )[0];

  return (
    <section className="mb-48 mt-24 grid grid-cols-1 gap-12" id={SECTION_NAV_ITEMS.BUEN_CAMINO}>
      <div className="flex flex-col">
        <div className="mb-8">
          <h3 className="text-xl font-medium">Buen Camino</h3>
          <p className="text-card-foreground/50 mb-8 text-sm font-medium">
            Don&apos;t waste your time looking back, you are not going that way.
          </p>
          {latestDiary && <DiaryCard {...latestDiary} />}
        </div>
      </div>
    </section>
  );
}

export default BuenCamino;
