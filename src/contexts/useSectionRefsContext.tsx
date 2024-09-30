"use client";

import { ANIMATION_Y_OFFSET } from "@/constants/animation";
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
  animationCompleted?: Record<NAV_ITEMS, boolean>;
  onAnimationComplete?: (section: NAV_ITEMS) => void;
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
  const projectsRef = useRef<HTMLDivElement>(null);
  const guestbookRef = useRef<HTMLDivElement>(null);

  const sectionRefs: SectionRefsContext["sectionRefs"] = useMemo(
    () => ({
      [NAV_ITEMS.HOME]: homeRef,
      [NAV_ITEMS.WHOAMI]: whoamiRef,
      [NAV_ITEMS.ABOUTME]: aboutmeRef,
      [NAV_ITEMS.PROJECTS]: projectsRef,
      [NAV_ITEMS.GUESTBOOK]: guestbookRef,
    }),
    []
  );

  const [animationCompleted, setAnimationCompleted] = useState<
    Record<NAV_ITEMS, boolean>
  >({
    [NAV_ITEMS.HOME]: false,
    [NAV_ITEMS.WHOAMI]: false,
    [NAV_ITEMS.ABOUTME]: false,
    [NAV_ITEMS.PROJECTS]: false,
    [NAV_ITEMS.GUESTBOOK]: false,
  });

  const handleAnimationComplete = useCallback((section: NAV_ITEMS) => {
    setAnimationCompleted((prev) => ({
      ...prev,
      [section]: true,
    }));
  }, []);

  const scrollToSection = useCallback(
    (section: NAV_ITEMS) => {
      const element = sectionRefs[section]?.current;
      if (!element) {
        return;
      }
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition +
        window.scrollY -
        (animationCompleted[section] ? 0 : ANIMATION_Y_OFFSET);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    [sectionRefs, animationCompleted]
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
      value={{
        sectionRefs,
        scrollToSection,
        sectionInView,
        onAnimationComplete: handleAnimationComplete,
        animationCompleted,
      }}
    >
      {children}
    </SectionRefsContext.Provider>
  );
};
