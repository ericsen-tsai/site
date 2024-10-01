"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/link";
import Image from "next/image";
import { useScrollContext } from "@/contexts/useSectionRefsContext";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollToSection, sectionInView } = useScrollContext();
  const router = useRouter();
  const inHomePage = usePathname() === "/";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerOpacity = scrollY > 0 ? 0.5 : 0;

  const handleItemClick = useCallback(
    (item: NAV_ITEMS) => {
      if (inHomePage) {
        scrollToSection(item);
        return;
      }
      router.push(`/#${item}`);
    },
    [inHomePage, scrollToSection, router]
  );

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 font-[family-name:var(--font-montserrat)] text-sm tracking-tighter backdrop-blur-sm"
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
          <ul className="flex items-center justify-center space-x-1 sm:space-x-6">
            {Object.entries(NAV_ITEMS)
              .filter(([, value]) => value !== NAV_ITEMS.GUESTBOOK)
              .map(([key, value]) => (
                <li key={key} className="text-center">
                  <a
                    className={cn(
                      "cursor-pointer opacity-50 transition-all hover:opacity-100 hover:tracking-tight w-[4.2rem] inline-block",
                      {
                        "text-primary underline":
                          inHomePage && sectionInView === value,
                      }
                    )}
                    onClick={() => handleItemClick(value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
