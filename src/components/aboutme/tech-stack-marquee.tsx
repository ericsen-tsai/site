"use client";

import Marquee from "react-fast-marquee";
import ReactIcon from "@/assets/react-icon.png";
import NextIcon from "@/assets/next-icon.png";
import MuiIcon from "@/assets/mui-icon.png";
import ReactQueryIcon from "@/assets/react-query-icon.png";
import ReduxIcon from "@/assets/redux-icon.png";
import TailwindCssIcon from "@/assets/tailwind-css-icon.png";
import AstroIcon from "@/assets/astro-icon.png";
import DockerIcon from "@/assets/docker-icon.png";
import SassIcon from "@/assets/sass-icon.png";
import SupabaseIcon from "@/assets/supabase-icon.png";
import TrpcIcon from "@/assets/trpc-icon.png";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type Item = {
  name: string;
  aspectRatioClassName?: string;
  imgSrc: StaticImageData;
  notInvert?: boolean;
};

const MARQUEE_ITEMS: Item[] = [
  {
    imgSrc: ReactIcon,
    name: "React.js",
  },
  {
    imgSrc: NextIcon,
    name: "Next.js",
  },
  {
    imgSrc: MuiIcon,
    name: "Material UI",
  },
  {
    imgSrc: ReactQueryIcon,
    name: "React Query",
  },
  {
    imgSrc: ReduxIcon,
    name: "Redux Toolkit",
  },
  {
    imgSrc: TailwindCssIcon,
    name: "TailwindCSS",
  },
  {
    imgSrc: AstroIcon,
    name: "Astro.js",
  },
  {
    imgSrc: DockerIcon,
    name: "docker",
  },
  {
    imgSrc: TrpcIcon,
    name: "tRPC",
    notInvert: true,
  },
  {
    imgSrc: SassIcon,
    name: "Sass",
  },
  {
    imgSrc: SupabaseIcon,
    name: "Supabase",
  },
];

function SingleLogoElement({ imgSrc, name, notInvert }: Item) {
  return (
    <div className="group relative flex h-36 items-center p-10">
      <Image
        src={imgSrc}
        alt={name}
        className={cn(
          "h-[72%] w-auto grayscale transition-all group-hover:blur-sm",
          {
            invert: !notInvert,
          }
        )}
        sizes="100vw"
        width={200}
        height={100}
      />
      <p className="invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-white shadow-black text-shadow-outline group-hover:visible">
        {name}
      </p>
    </div>
  );
}

function LogoMarquee() {
  return (
    <Marquee
      gradient
      gradientColor={"black"}
      className="h-full overflow-hidden"
      speed={40}
      pauseOnHover
    >
      {MARQUEE_ITEMS.map((element) => (
        <SingleLogoElement key={element.name} {...element} />
      ))}
    </Marquee>
  );
}

export default LogoMarquee;