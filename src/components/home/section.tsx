"use client";

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/useSectionRefsContext";

const HeroSection = () => {
  const [textColor, setTextColor] = useState("text-blue-500");
  const { sectionRefs } = useScrollContext();

  return (
    <section
      className="flex h-screen flex-col items-center justify-center p-20 text-center"
      id={NAV_ITEMS.HOME}
      ref={sectionRefs?.[NAV_ITEMS.HOME]}
    >
      <Image
        src={"/hero/ericsen.png"}
        alt="Hero Logo"
        width={0}
        height={0}
        className="mb-8 h-auto w-[12.5rem]"
        id="hero-logo"
        priority
        sizes="100vw"
      />
      <h1 className="mb-5 text-3xl font-bold">I&apos;m Ericsen,</h1>
      <h2 className="text-2xl font-semibold">
        a Frontend Developer who makes web apps <br />
        <span className={textColor}>
          <TypeAnimation
            speed={20}
            sequence={[
              () => setTextColor("text-blue-500"),
              "fascinating.",
              4000,
              "",
              300,
              () => setTextColor("text-pink-500"),
              "stunning.",
              4000,
              "",
              300,
              () => setTextColor("text-teal-500"),
              "engaging.",
              4000,
              "",
              300,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="inline-block"
          />
        </span>
      </h2>
    </section>
  );
};

export default HeroSection;