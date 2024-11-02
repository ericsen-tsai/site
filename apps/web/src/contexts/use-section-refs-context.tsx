"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { ANIMATION_Y_OFFSET } from "@/constants/animation";
import { SECTION_NAV_ITEMS } from "@/constants/link";

type TSectionRefsContext = {
  scrollToSection: (section: SECTION_NAV_ITEMS) => void;
  sectionRefs?: Record<SECTION_NAV_ITEMS, React.RefObject<HTMLDivElement | null>>;
  animationCompleted?: Record<SECTION_NAV_ITEMS, boolean>;
  onAnimationComplete?: (section: SECTION_NAV_ITEMS) => void;
  sectionInView: SECTION_NAV_ITEMS;
};

const SectionRefsContext = createContext<TSectionRefsContext>({
  scrollToSection: () => {
    console.log("EMPTY");
  },
  sectionInView: SECTION_NAV_ITEMS.HOME
});

export const useScrollContext = () => useContext(SectionRefsContext);

export const SectionRefsProvider = ({ children }: { children: React.ReactNode }) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const whoamiRef = useRef<HTMLDivElement>(null);
  const aboutmeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const guestbookRef = useRef<HTMLDivElement>(null);

  const sectionRefs: TSectionRefsContext["sectionRefs"] = useMemo(
    () => ({
      [SECTION_NAV_ITEMS.HOME]: homeRef,
      [SECTION_NAV_ITEMS.WHOAMI]: whoamiRef,
      [SECTION_NAV_ITEMS.ABOUTME]: aboutmeRef,
      [SECTION_NAV_ITEMS.PROJECTS]: projectsRef,
      [SECTION_NAV_ITEMS.GUESTBOOK]: guestbookRef
    }),
    []
  );

  const [animationCompleted, setAnimationCompleted] = useState<Record<SECTION_NAV_ITEMS, boolean>>({
    [SECTION_NAV_ITEMS.HOME]: false,
    [SECTION_NAV_ITEMS.WHOAMI]: false,
    [SECTION_NAV_ITEMS.ABOUTME]: false,
    [SECTION_NAV_ITEMS.PROJECTS]: false,
    [SECTION_NAV_ITEMS.GUESTBOOK]: false
  });

  const handleAnimationComplete = useCallback((section: SECTION_NAV_ITEMS) => {
    setAnimationCompleted((prev) => ({
      ...prev,
      [section]: true
    }));
  }, []);

  const scrollToSection = useCallback(
    (section: SECTION_NAV_ITEMS) => {
      const element = sectionRefs[section].current;
      if (!element) {
        return;
      }
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - (animationCompleted[section] ? 0 : ANIMATION_Y_OFFSET);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    [sectionRefs, animationCompleted]
  );

  const [sectionInView, setSectionInView] = useState<SECTION_NAV_ITEMS>(SECTION_NAV_ITEMS.HOME);

  useEffect(() => {
    const checkSectionInView = () => {
      const scrollPosition = window.scrollY;
      const section = Object.entries(sectionRefs).findLast(
        ([, ref]) => ref.current && ref.current.offsetTop - 100 <= scrollPosition
      );
      if (section && (section[0] as SECTION_NAV_ITEMS) !== sectionInView) {
        setSectionInView(section[0] as SECTION_NAV_ITEMS);
      }
    };

    window.addEventListener("scroll", checkSectionInView);

    return () => {
      window.removeEventListener("scroll", checkSectionInView);
    };
  }, [sectionRefs, sectionInView]);

  const value = useMemo(
    () => ({
      sectionRefs,
      scrollToSection,
      sectionInView,
      onAnimationComplete: handleAnimationComplete,
      animationCompleted
    }),
    [sectionRefs, scrollToSection, sectionInView, handleAnimationComplete, animationCompleted]
  );

  return <SectionRefsContext.Provider value={value}>{children}</SectionRefsContext.Provider>;
};
