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
        icon: <Clock className="size-3" />,
        content: <p className="text-lg tracking-tighter">{totalHoursText}</p>,
      },
      {
        title: "Most Used Language",
        icon: <Code className="size-3" />,
        content: <p className="text-lg tracking-tighter">{language}</p>,
      },
      {
        title: "Most Used Editor",
        icon: <Edit3 className="size-3" />,
        content: <p className="text-lg tracking-tighter">{editor}</p>,
      },
    ],
    [totalHoursText, language, editor]
  );

  return (
    <section
      id={NAV_ITEMS.ABOUTME}
      className="flex min-h-screen flex-col items-center justify-center"
      ref={sectionRefs?.[NAV_ITEMS.ABOUTME]}
    >
      <h2 className="mb-8 text-center text-3xl font-bold">About Me</h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 justify-center justify-items-stretch gap-8 px-8 md:grid-cols-3">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      <LogoMarquee />
    </section>
  );
}
