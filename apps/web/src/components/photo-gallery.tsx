"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@erichandsen/ui";
import Image from "next/image";

const PHOTOS = [
  {
    src: "/photo-gallery/fire_stick.png",
    alt: "Fire Stick",
    spanRow: 2,
    spanCol: 1,
    description: "Fire stick practice during college"
  },
  {
    src: "/photo-gallery/camping.png",
    alt: "Camping",
    spanRow: 3,
    spanCol: 2,
    description: "Camping with Dollars and Sense"
  },
  {
    src: "/photo-gallery/guinea_pigs.png",
    alt: "Guinea Pigs",
    spanRow: 1,
    spanCol: 1,
    description:
      "My guinea pigs, Fengui and Mixiang (which means rice cake and puffed rice respectively in Chinese)"
  },
  {
    src: "/photo-gallery/freediving.png",
    alt: "Freediving",
    spanRow: 2,
    spanCol: 2,
    description: "Freediving with Justina at Plane Wreck, Bohol"
  },
  {
    src: "/photo-gallery/guinea_pigs.png",
    alt: "Guinea Pigs",
    spanRow: 2,
    spanCol: 1,
    description:
      "My guinea pigs, Fengui and Mixiang (which means rice cake and puffed rice respectively in Chinese)"
  }
];

function PhotoGallery() {
  return (
    <div className="grid auto-rows-[100px] grid-cols-3 gap-4 [&:has(div:hover)>div:not(:hover)]:scale-[99%]">
      {PHOTOS.map((photo) => (
        <Tooltip key={photo.src}>
          <TooltipTrigger asChild>
            <div
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[102%]"
              style={{
                gridRow: `span ${photo.spanRow}`,
                gridColumn: `span ${photo.spanCol}`
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-opacity duration-300 ease-in-out hover:opacity-80"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent asChild className="bg-secondary max-w-xs text-sm">
            <span className="inline-block">{photo.description}</span>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export default PhotoGallery;
