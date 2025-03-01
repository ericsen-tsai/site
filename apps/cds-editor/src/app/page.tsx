import { auth } from "@erichandsen/auth";
import { forbidden, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  if (session.user?.role !== "admin") {
    forbidden();
  }
  return (
    <div className="relative min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      Home
    </div>
  );
}
