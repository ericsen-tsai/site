"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/link";
import Image from "next/image";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerOpacity = scrollY > 0 ? 0.5 : 0;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 font-[family-name:var(--font-geist-mono)] text-sm tracking-tighter"
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
            <li>
              <Link
                href={`#${NAV_ITEMS.HOME}`}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`#${NAV_ITEMS.WHOAMI}`}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Who Am I
              </Link>
            </li>
            <li>
              <Link
                href={`#${NAV_ITEMS.ABOUTME}`}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                href={`#${NAV_ITEMS.SOCIAL}`}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Social & Habits
              </Link>
            </li>
            <li>
              <Link
                href={`#${NAV_ITEMS.GUESTBOOK}`}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Guest Book
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
