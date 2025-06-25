import { CommandMenu } from "@erichandsen/ui";
import { type Metadata } from "next";

import { Education } from "@/components/eduction";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skill";
import { Summary } from "@/components/summary";
import { WorkExperience } from "@/components/work-experience";
import { RESUME_DATA } from "@/constants";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - Resume`,
  description: RESUME_DATA.about,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "https://cv.erichandsen.dev/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name}'s profile picture`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    images: ["https://cv.erichandsen.dev/opengraph-image"]
  }
};

/**
 * Transform social links for command menu
 */
function getCommandMenuLinks() {
  const links = [];

  links.push({
    url: RESUME_DATA.personalWebsiteUrl,
    title: "Personal Website"
  });

  return [
    ...links,
    ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
      url: socialMediaLink.url,
      title: socialMediaLink.name
    }))
  ];
}

export default function ResumePage() {
  return (
    <main
      className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-11"
      id="main-content"
    >
      <div className="sr-only">
        <h1>{RESUME_DATA.name}&apos;s Resume</h1>
      </div>

      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4"
        aria-label="Resume Content"
      >
        <Header />

        <div className="space-y-8 print:space-y-4">
          <Summary summary={RESUME_DATA.summary} />

          <WorkExperience work={RESUME_DATA.work} />

          <Education education={RESUME_DATA.education} />

          <Skills skills={RESUME_DATA.skills} />

          <Projects projects={RESUME_DATA.projects} />
        </div>
      </section>

      <nav className="print:hidden" aria-label="Quick navigation">
        <CommandMenu links={getCommandMenuLinks()} />
      </nav>
    </main>
  );
}
