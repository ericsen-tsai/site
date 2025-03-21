"use client";

import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  date: string;
  content: string;
  heroImageUrl: string | null;
  latitude: string;
  longitude: string;
};

function DiaryCard({ title, date, content, heroImageUrl, latitude, longitude }: Props) {
  return (
    <article className="grid grid-cols-1 gap-4 md:max-h-[500px] md:grid-cols-2">
      <div className="relative mb-6 size-full h-[500px] overflow-hidden rounded-lg">
        {heroImageUrl && (
          <Image src={heroImageUrl} alt={title} className="size-full object-cover" fill />
        )}
      </div>
      <div className="space-y-4">
        <h4 className="text-2xl font-semibold">{title}</h4>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPin className="size-3" />
          <span>
            {Number(latitude).toFixed(2)}, {Number(longitude).toFixed(2)}
          </span>
        </div>
        <time className="text-muted-foreground flex items-center gap-2 text-sm">
          <Calendar className="size-3" />
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </time>
        <p className="text-card-foreground/80 line-clamp-[16] leading-relaxed">{content}</p>
      </div>
    </article>
  );
}

export default DiaryCard;
