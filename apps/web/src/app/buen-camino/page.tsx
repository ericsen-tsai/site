import BuenCaminoMap from "@/components/buen-camino-map";
import { api } from "@/trpc/server";

async function BuenCamino() {
  const caminoDiaries = await api.diaries.getAll();

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] py-4">
      <h1 className="mb-8 pt-8 text-2xl font-bold">Buen Camino</h1>
      <BuenCaminoMap diaries={caminoDiaries} />
    </div>
  );
}

export default BuenCamino;
