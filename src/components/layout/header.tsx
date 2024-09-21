"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/link";
import Image from "next/image";
import { useScrollContext } from "@/contexts/useSectionRefsContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollToSection, sectionInView } = useScrollContext();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerOpacity = scrollY > 0 ? 0.5 : 0;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 text-sm tracking-tighter backdrop-blur-sm"
      style={{ backgroundColor: `rgba(0, 0, 0, ${headerOpacity})` }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between space-x-8 p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/favicon/favicon-32x32.png"
            alt="Logo"
            width={24}
            height={24}
            className="rounded-full invert transition-transform duration-500 hover:scale-105"
          />
        </Link>
        <nav>
          <ul className="flex items-center justify-center space-x-6">
            <li className="text-center">
              <a
                className={cn(
                  "cursor-pointer opacity-50 transition-all hover:opacity-100 hover:tracking-tight w-[4.2rem] inline-block",
                  {
                    "text-primary underline": sectionInView === NAV_ITEMS.HOME,
                  }
                )}
                onClick={() => scrollToSection(NAV_ITEMS.HOME)}
              >
                Home
              </a>
            </li>
            <li className="text-center">
              <a
                className={cn(
                  "cursor-pointer opacity-50 transition-all hover:opacity-100 hover:tracking-tight w-[4.2rem] inline-block",
                  {
                    "text-primary underline":
                      sectionInView === NAV_ITEMS.WHOAMI,
                  }
                )}
                onClick={() => scrollToSection(NAV_ITEMS.WHOAMI)}
              >
                Who Am I
              </a>
            </li>
            <li className="text-center">
              <a
                className={cn(
                  "cursor-pointer opacity-50 transition-all hover:opacity-100 hover:tracking-tight w-[4.2rem] inline-block",
                  {
                    "text-primary underline":
                      sectionInView === NAV_ITEMS.ABOUTME,
                  }
                )}
                onClick={() => scrollToSection(NAV_ITEMS.ABOUTME)}
              >
                About Me
              </a>
            </li>
            <li className="text-center">
              <a
                className={cn(
                  "cursor-pointer opacity-50 transition-all hover:opacity-100 hover:tracking-tight w-[4.2rem] inline-block",
                  {
                    "text-primary underline":
                      sectionInView === NAV_ITEMS.PROJECTS,
                  }
                )}
                onClick={() => scrollToSection(NAV_ITEMS.PROJECTS)}
              >
                Projects
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
