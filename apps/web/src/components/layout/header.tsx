"use client";

import { cn } from "@erichandsen/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { LINK_NAV_ITEMS, SECTION_NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/use-section-refs-context";

const NAV_ITEMS = [
  SECTION_NAV_ITEMS.HOME,
  SECTION_NAV_ITEMS.ABOUTME,
  SECTION_NAV_ITEMS.PROJECTS,
  LINK_NAV_ITEMS.BLOG
] as const;

function Header() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollToSection, sectionInView, onAnimationComplete } = useScrollContext();
  const router = useRouter();
  const inHomePage = usePathname() === "/";
  const isBlogPage = usePathname() === "/blog";
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerOpacity = scrollY > 0 ? 0.5 : 0;

  const handleItemClick = useCallback(
    (item: (typeof NAV_ITEMS)[number]) => {
      if (item === LINK_NAV_ITEMS.BLOG) {
        router.push(`/blog`);
        return;
      }
      if (inHomePage) {
        scrollToSection(item);
        return;
      }
      onAnimationComplete?.(item);
      router.push(`/#${item}`);
    },
    [inHomePage, onAnimationComplete, scrollToSection, router]
  );

  const shouldDisplayUnderline = useCallback(
    (item: (typeof NAV_ITEMS)[number]) => {
      if (isBlogPage && item === LINK_NAV_ITEMS.BLOG) return true;
      return inHomePage && sectionInView === item;
    },
    [inHomePage, isBlogPage, sectionInView]
  );

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 font-[family-name:var(--font-montserrat)] text-sm tracking-tighter backdrop-blur-sm"
      style={{ backgroundColor: `rgba(0, 0, 0, ${headerOpacity})` }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center p-4 sm:justify-between sm:space-x-8">
        <Link href="/" className="hidden items-center sm:flex">
          <Image
            src="/favicon/favicon-32x32.png"
            alt="Logo"
            width={24}
            height={24}
            className="rounded-full invert transition-transform duration-500 hover:scale-105"
          />
        </Link>
        <nav>
          <ul className="flex items-center justify-center space-x-1 font-semibold sm:space-x-6">
            {NAV_ITEMS.map((value) => (
              <li key={value} className="text-center">
                <button
                  type="button"
                  className={cn(
                    "inline-block w-[4.5rem] cursor-pointer opacity-50 transition-all hover:tracking-tight hover:opacity-100",
                    {
                      "text-primary underline": shouldDisplayUnderline(value)
                    }
                  )}
                  onClick={() => {
                    handleItemClick(value);
                  }}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
