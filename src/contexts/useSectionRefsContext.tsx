"use client";

import { NAV_ITEMS } from "@/constants/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SectionRefsContext = {
  scrollToSection: (section: NAV_ITEMS) => void;
  sectionRefs?: Record<NAV_ITEMS, React.RefObject<HTMLDivElement>>;
  sectionInView: NAV_ITEMS;
};

const SectionRefsContext = createContext<SectionRefsContext>({
  scrollToSection: () => {},
  sectionInView: NAV_ITEMS.HOME,
});

export const useScrollContext = () => useContext(SectionRefsContext);

export const SectionRefsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const whoamiRef = useRef<HTMLDivElement>(null);
  const aboutmeRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const guestbookRef = useRef<HTMLDivElement>(null);

  const sectionRefs: SectionRefsContext["sectionRefs"] = useMemo(
    () => ({
      [NAV_ITEMS.HOME]: homeRef,
      [NAV_ITEMS.WHOAMI]: whoamiRef,
      [NAV_ITEMS.ABOUTME]: aboutmeRef,
      [NAV_ITEMS.SOCIAL]: socialRef,
      [NAV_ITEMS.GUESTBOOK]: guestbookRef,
    }),
    []
  );

  const scrollToSection = useCallback(
    (section: NAV_ITEMS) => {
      sectionRefs[section]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [sectionRefs]
  );

  const [sectionInView, setSectionInView] = useState<NAV_ITEMS>(NAV_ITEMS.HOME);

  useEffect(() => {
    const checkSectionInView = () => {
      const scrollPosition = window.scrollY;
      const section = Object.entries(sectionRefs).findLast(
        ([, ref]) =>
          ref.current && ref.current.offsetTop - 100 <= scrollPosition
      );
      if (section && section[0] !== sectionInView) {
        setSectionInView(section[0] as NAV_ITEMS);
      }
    };

    window.addEventListener("scroll", checkSectionInView);

    return () => {
      window.removeEventListener("scroll", checkSectionInView);
    };
  }, [sectionRefs, sectionInView]);

  return (
    <SectionRefsContext.Provider
      value={{ sectionRefs, scrollToSection, sectionInView }}
    >
      {children}
    </SectionRefsContext.Provider>
  );
};
