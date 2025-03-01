import { auth } from "@erichandsen/auth";
import { getGuestbookCommentsWithUserImages } from "@erichandsen/dal";

import getAllTimeSinceToday from "@/actions/get-all-time-since-today";
import getMostUsedLanguageDuringSevenDays from "@/actions/get-last-seven-day-most-used-language-and-editor";
import AboutMeSection from "@/components/aboutme/section";
import Container from "@/components/container";
import Guestbook from "@/components/guestbook";
import HeroSection from "@/components/home/section";
import ProjectSection from "@/components/projects/section";
import WhoAmISection from "@/components/whoami/section";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ totalHoursText }, { language, editor }, comments] = await Promise.all([
    getAllTimeSinceToday(),
    getMostUsedLanguageDuringSevenDays(),
    getGuestbookCommentsWithUserImages()
  ]);
  const session = await auth();
  return (
    <div className="relative min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      <HeroSection />
      <WhoAmISection />
      <AboutMeSection
        totalHoursText={totalHoursText}
        language={language.name ?? ""}
        editor={editor.name ?? ""}
      />
      <ProjectSection />
      <Container>
        {/* <PhotoGallery /> */}
        <Guestbook user={session?.user} comments={comments} />
      </Container>
    </div>
  );
}
