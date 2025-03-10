"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { ANIMATION_DURATION, ANIMATION_Y_OFFSET } from "@/constants/animation";
import { SECTION_NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/use-section-refs-context";

function WhoAmISection() {
  const { sectionRefs, onAnimationComplete, animationCompleted } = useScrollContext();

  return (
    <motion.section
      id={SECTION_NAV_ITEMS.WHOAMI}
      className="m-auto flex min-h-screen max-w-4xl items-center px-8"
      ref={sectionRefs?.[SECTION_NAV_ITEMS.WHOAMI]}
      initial={{
        y: animationCompleted?.[SECTION_NAV_ITEMS.WHOAMI] ? 0 : ANIMATION_Y_OFFSET,
        opacity: 0
      }}
      transition={{ duration: ANIMATION_DURATION }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        onAnimationComplete?.(SECTION_NAV_ITEMS.WHOAMI);
      }}
    >
      <div>
        <h2 className="mb-8 text-center text-3xl font-bold">
          Who Am I?
          <p className="text-card-foreground/50 text-sm font-medium">
            A person doesn’t belong to a place until there is someone dead under the ground.
          </p>
        </h2>

        <div className="text-background space-y-6">
          <p className="leading-relaxed">
            I&apos;m a Frontend Developer with a master&apos;s in biomedical engineering,
            experienced in building user-friendly interfaces for{" "}
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
            , with a solid background in software development, UX and biomedical.
          </p>
          <p className="leading-relaxed">
            I learn fast, work well in teams, and love creating clean, functional designs that
            enhance user experiences.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default WhoAmISection;
