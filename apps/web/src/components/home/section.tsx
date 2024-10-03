"use client";

import { type MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import { NAV_ITEMS } from "@/constants/link";
import { useScrollContext } from "@/contexts/use-section-refs-context";

import BlobMorphing from "./blob-morphing";
import Connect from "./connect";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const HeroSection = () => {
  const [textColor, setTextColor] = useState("text-blue-500");
  const { sectionRefs } = useScrollContext();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section
      className="relative flex h-screen flex-col items-center justify-center p-20 text-center"
      id={NAV_ITEMS.HOME}
      ref={sectionRefs?.[NAV_ITEMS.HOME]}
    >
      <div className="photo-container mb-8">
        <div className="photo-flipper">
          <Image
            src="/hero/ericsen.png"
            alt="Hero Logo"
            width={200}
            height={200}
            className="photo-front h-auto w-[12.5rem]"
            id="hero-logo"
            priority
            sizes="100vw"
          />
          <Image
            src="/hero/erichandsen.png"
            alt="Hero Logo Alternate"
            width={200}
            height={200}
            className="photo-back h-auto w-[12.5rem] rounded-full border-[0.05rem] border-white"
            priority
            sizes="100vw"
          />
        </div>
      </div>
      <h1 className="mb-3 text-3xl font-bold">I&apos;m Ericsen,</h1>
      <h2 className="mb-16 text-2xl font-semibold" ref={ref}>
        a Frontend Developer who makes web apps <br />
        <span className={textColor}>
          <TypeAnimation
            speed={20}
            sequence={[
              () => {
                setTextColor("text-blue-500");
              },
              "fascinating.",
              4000,
              "",
              300,
              () => {
                setTextColor("text-pink-500");
              },
              "stunning.",
              4000,
              "",
              300,
              () => {
                setTextColor("text-teal-500");
              },
              "engaging.",
              4000,
              "",
              300
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="inline-block"
          />
        </span>
      </h2>
      <BlobMorphing style={{ y }} />
      <Connect />
    </section>
  );
};

export default HeroSection;
