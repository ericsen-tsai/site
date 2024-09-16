"use client";

import Image from "next/image";

const photos = [
  {
    src: "/photo-gallery/fire_stick.png",
    alt: "Fire Stick",
    spanRow: 2,
    spanCol: 1,
  },
  { src: "/photo-gallery/camping.png", alt: "Camping", spanRow: 3, spanCol: 2 },
  {
    src: "/photo-gallery/guinea_pigs.png",
    alt: "Guinea Pigs",
    spanRow: 1,
    spanCol: 1,
  },
  {
    src: "/photo-gallery/freediving.png",
    alt: "Freediving",
    spanRow: 2,
    spanCol: 2,
  },
  {
    src: "/photo-gallery/guinea_pigs.png",
    alt: "Guinea Pigs",
    spanRow: 2,
    spanCol: 1,
  },
];

function PhotoGallery() {
  return (
    <div className="grid auto-rows-[100px] grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          style={{
            gridRow: `span ${photo.spanRow}`,
            gridColumn: `span ${photo.spanCol}`,
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
      ))}
    </div>
  );
}

export default PhotoGallery;
