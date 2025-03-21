import BuenCaminoMap from "@/components/buen-camino-map";
import { api } from "@/trpc/server";

async function BuenCamino() {
  const caminoDiaries = await api.diaries.getAll();

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] max-w-5xl flex-col scroll-smooth p-20 font-[family-name:var(--font-montserrat)]">
      <div>
        <h1 className="mb-3 flex items-center justify-center text-center text-3xl font-bold">
          Buen Camino
        </h1>
        <p className="text-card-foreground/50 mb-8 text-center text-sm font-medium">
          Books are not just for reading the words within; they are also tools for adjusting one's
          own feelings.
        </p>
      </div>
      <div className="w-full flex-1">
        <BuenCaminoMap diaries={caminoDiaries} />
      </div>
    </div>
  );
}

export default BuenCamino;
