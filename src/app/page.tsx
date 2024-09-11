import HeroSection from "@/components/home/section";
import WhoAmISection from "@/components/whoami/section";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-mono)]">
      <HeroSection />
      <WhoAmISection />
    </div>
  );
}
