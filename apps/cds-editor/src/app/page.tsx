import { DiaryForm } from "../components/cds-form";

export default function CDSEditorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Create Diary Entry</h1>
      <DiaryForm />
    </main>
  );
}
