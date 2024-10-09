// eslint-disable-next-line eslint-comments/disable-enable-pair -- no-static-element-interactions
/* eslint-disable jsx-a11y/no-static-element-interactions -- Allowing static element interactions for specific use case */
// eslint-disable-next-line eslint-comments/disable-enable-pair -- click-events-have-key-events
/* eslint-disable jsx-a11y/click-events-have-key-events -- Disabling key events requirement for click handlers */
// eslint-disable-next-line eslint-comments/disable-enable-pair -- anchor-is-valid
/* eslint-disable jsx-a11y/anchor-is-valid -- Using anchors without href for custom behavior */
"use client";

import { cn } from "@erichandsen/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/use-section-refs-context";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollToSection, sectionInView } = useScrollContext();
  const router = useRouter();
  const inHomePage = usePathname() === "/";

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
            {Object.entries(NAV_ITEMS)
              .filter(([, value]) => value !== NAV_ITEMS.GUESTBOOK)
              .map(([key, value]) => (
                <li key={key} className="text-center">
                  <a
                    className={cn(
                      "inline-block w-[4.5rem] cursor-pointer opacity-50 transition-all hover:tracking-tight hover:opacity-100",
                      {
                        "text-primary underline": inHomePage && sectionInView === value
                      }
                    )}
                    onClick={() => {
                      handleItemClick(value);
                    }}
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
