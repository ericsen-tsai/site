import getAllTimeSinceToday from "@/actions/getAllTimeSinceToday";
import getMostUsedLanguageDuringSevenDays from "@/actions/getLastSevenDaysMostUsedLanguageAndEditor";
import HeroSection from "@/components/home/section";
import WhoAmISection from "@/components/whoami/section";
import AboutMeSection from "@/components/aboutme/section";
export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ totalHoursText }, { language, editor }] = await Promise.all([
    getAllTimeSinceToday(),
    getMostUsedLanguageDuringSevenDays(),
  ]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)]">
      <HeroSection />
      <WhoAmISection />
      <AboutMeSection
        totalHoursText={totalHoursText}
        language={language.name}
        editor={editor.name}
      />
    </div>
  );
}
