"use client";

import { Clock, Code, Edit3 } from "lucide-react";
import LogoMarquee from "./tech-stack-marquee";
import { useScrollContext } from "@/contexts/useSectionRefsContext";
import { NAV_ITEMS } from "@/constants/link";
import { useMemo } from "react";
import DashboardCard from "./dashboard-card";

type Props = {
  totalHoursText: string;
  language: string;
  editor: string;
};

export default function AboutMe({ totalHoursText, language, editor }: Props) {
  const { sectionRefs } = useScrollContext();

  const dashboardCards = useMemo(
    () => [
      {
        title: "Coding Hours",
        icon: <Clock className="size-4" />,
        content: <p className="text-lg tracking-tighter">{totalHoursText}</p>,
      },
      {
        title: "Most Used Language",
        icon: <Code className="size-4" />,
        content: <p className="text-lg tracking-tighter">{language}</p>,
      },
      {
        title: "Most Used Editor",
        icon: <Edit3 className="size-4" />,
        content: <p className="text-lg tracking-tighter">{editor}</p>,
      },
    ],
    [totalHoursText, language, editor]
  );

  return (
    <section
      id={NAV_ITEMS.ABOUTME}
      className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-8"
      ref={sectionRefs?.[NAV_ITEMS.ABOUTME]}
    >
      <h2 className="mb-8 text-center text-3xl font-bold">About Me</h2>
      <div className="grid w-full max-w-xs grid-cols-1 justify-items-stretch gap-y-4 md:max-w-none md:grid-cols-3 md:gap-x-4">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      <LogoMarquee />
    </section>
  );
}
