import { auth } from "@erichandsen/auth";
import { redirect } from "next/navigation";

import { DiaryForm } from "../components/cds-form";

export default async function CDSEditorPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Camino de Santiago</h1>
      <DiaryForm />
    </main>
  );
}
