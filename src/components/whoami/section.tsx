"use client";

import { NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/useSectionRefsContext";
import Link from "next/link";

function WhoAmISection() {
  const { sectionRefs } = useScrollContext();

  return (
    <section
      id={NAV_ITEMS.WHOAMI}
      className="m-auto flex min-h-screen max-w-4xl items-center px-8"
      ref={sectionRefs?.[NAV_ITEMS.WHOAMI]}
    >
      <div>
        <h2 className="mb-8 text-center text-3xl font-bold text-primary">
          Who Am I?
        </h2>
        <div className="space-y-6 text-foreground">
          <p className="leading-relaxed">
            I&apos;m a Frontend Developer with a master&apos;s in biomedical
            engineering, experienced in building user-friendly interfaces for{" "}
            <Link
              href="https://theixt.com/launch-pad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              insurance purchase CMS
            </Link>
            ,{" "}
            <Link
              href="https://insights-info.fanti.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              fan engagement platforms
            </Link>
            , and more.
          </p>
          <p className="leading-relaxed">
            I&apos;m passionate about{" "}
            <Link
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              React.js
            </Link>{" "}
            &{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Next.js
            </Link>
            , with a solid background in software development, UX and
            biomedical.
          </p>
          <p className="leading-relaxed">
            I learn fast, work well in teams, and love creating clean,
            functional designs that enhance user experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhoAmISection;