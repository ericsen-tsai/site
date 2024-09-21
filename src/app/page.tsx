import getAllTimeSinceToday from "@/actions/getAllTimeSinceToday";
import getMostUsedLanguageDuringSevenDays from "@/actions/getLastSevenDaysMostUsedLanguageAndEditor";
import HeroSection from "@/components/home/section";
import WhoAmISection from "@/components/whoami/section";
import AboutMeSection from "@/components/aboutme/section";
import ProjectSection from "@/components/projects/section";
import Container from "@/components/container";
import Guestbook from "@/components/guestbook";
export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ totalHoursText }, { language, editor }] = await Promise.all([
    getAllTimeSinceToday(),
    getMostUsedLanguageDuringSevenDays(),
  ]);

  return (
    <div className="min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      <HeroSection />
      <WhoAmISection />
      <AboutMeSection
        totalHoursText={totalHoursText}
        language={language.name}
        editor={editor.name}
      />
      <ProjectSection />
      <Container>
        {/* <PhotoGallery /> */}
        <Guestbook />
      </Container>
    </div>
  );
}
