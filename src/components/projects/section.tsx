"use client";

import { NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/useSectionRefsContext";
import ProjectCard from "./project-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ANIMATION_DURATION, ANIMATION_Y_OFFSET } from "@/constants/animation";

const PROJECTS = [
  {
    title: "Site",
    description: "Ericsen's Portfolio Site",
    link: ".",
    techStacks: ["React", "Next.js", "Tailwind CSS", "Shadcn"],
    githubLink: "https://github.com/ericsen-tsai/site",
  },
];

const ProjectSection = () => {
  const { sectionRefs, onAnimationComplete, animationCompleted } =
    useScrollContext();

  return (
    <motion.section
      id={NAV_ITEMS.PROJECTS}
      className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-8"
      ref={sectionRefs?.[NAV_ITEMS.PROJECTS]}
      initial={{
        y: animationCompleted?.[NAV_ITEMS.PROJECTS] ? 0 : ANIMATION_Y_OFFSET,
        opacity: 0,
      }}
      transition={{ duration: ANIMATION_DURATION }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        onAnimationComplete?.(NAV_ITEMS.PROJECTS);
      }}
    >
      <h2 className="mb-8 text-center text-3xl font-bold">
        Projects
        <p className="text-sm font-normal text-card-foreground/50">
          Life cannot be cheated; everything that has happened becomes evidence.
        </p>
      </h2>
      <div
        className={cn(
          "grid w-full max-w-xs grid-cols-1 justify-items-stretch gap-y-4 md:max-w-none md:gap-x-4 md:grid-cols-3",
          { "[&>*]:col-start-2 [&>*]:col-end-2": PROJECTS.length === 1 }
        )}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectSection;
