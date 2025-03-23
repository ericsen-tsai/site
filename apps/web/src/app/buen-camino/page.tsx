import MapDiaries from "@/components/buen-camino/map-diaries";
import { api } from "@/trpc/server";

async function BuenCamino() {
  const caminoDiaries = await api.diaries.getAll();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col scroll-smooth px-4 py-20 font-[family-name:var(--font-montserrat)] md:h-[calc(100vh-5rem)] md:py-20">
      <div>
        <h1 className="mb-3 flex items-center justify-center text-center text-3xl font-bold">
          Camino Shells
        </h1>
        <p className="text-card-foreground/50 mb-8 text-center text-sm font-medium">
          I walk down another street.
        </p>
      </div>
      <div className="w-full flex-1">
        <MapDiaries diaries={caminoDiaries} />
      </div>
    </div>
  );
}

export default BuenCamino;
