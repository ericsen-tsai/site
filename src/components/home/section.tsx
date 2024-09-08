"use client";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

const HeroSection = () => {
  const [textColor, setTextColor] = useState("text-blue-500");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-20">
      <Image
        src={"/hero/ericsen.png"}
        alt="Hero Logo"
        width={200}
        height={200}
        className="mb-8"
        id="hero-logo"
      />
      <h1 className="text-3xl font-bold mb-5">I&apos;m Ericsen,</h1>
      <h2 className="text-2xl font-semibold">
        a Frontend Developer who makes web apps <br />
        <span className={textColor}>
          <TypeAnimation
            sequence={[
              () => setTextColor("text-blue-500"),
              "fascinating.",
              2000,
              "",
              200,
              () => setTextColor("text-pink-500"),
              "stunning.",
              2000,
              "",
              200,
              () => setTextColor("text-teal-500"),
              "engaging.",
              2000,
              "",
              200,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="inline-block"
          />
        </span>
      </h2>
    </div>
  );
};

export default HeroSection;
