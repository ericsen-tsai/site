"use client";

import Image from "next/image";

type Props = {
  title: string;
  date: string;
  content: string;
  heroImageUrl: string;
};

function DiaryCard({ title, date, content, heroImageUrl }: Props) {
  return (
    <article className="grid grid-cols-1 gap-4 md:max-h-[500px] md:grid-cols-2">
      <div className="relative mb-6 size-full h-[500px] overflow-hidden rounded-lg">
        <Image src={heroImageUrl} alt={title} className="size-full object-cover" fill />
      </div>
      <div className="space-y-4">
        <h4 className="text-2xl font-semibold">{title}</h4>
        <time className="text-muted-foreground text-sm">
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
