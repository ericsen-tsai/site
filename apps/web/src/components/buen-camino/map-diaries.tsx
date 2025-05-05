"use client";

import { type DiaryEntry } from "@erichandsen/dal";
import { Calendar, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicMap = dynamic(() => import("./buen-camino-map"), {
  ssr: false
});

interface MapDiariesProps {
  diaries: DiaryEntry[];
}

function MapDiaries({ diaries }: MapDiariesProps) {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | undefined>(() => {
    if (diaries.length === 0) return;
    const latestDiary = diaries.toSorted(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )[0];
    return latestDiary;
  });

  return (
    <div className="grid grid-cols-1 md:h-full md:grid-cols-2">
      <div className="relative h-[360px] md:h-full">
        <DynamicMap
          diaries={diaries}
          selectedEntry={selectedEntry}
          onSelectEntry={setSelectedEntry}
        />
      </div>

      <div className="h-full p-4 md:max-h-full md:overflow-y-auto">
        {selectedEntry && (
          <article className="grid h-full grid-cols-1 gap-4">
            <div className="flex flex-col gap-4">
              <h4 className="text-2xl font-semibold">{selectedEntry.title}</h4>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <MapPin className="size-3" />
                <span>
                  {Number(selectedEntry.latitude).toFixed(2)},{" "}
                  {Number(selectedEntry.longitude).toFixed(2)}
                </span>
              </div>
              <time className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="size-3" />
                {new Date(selectedEntry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </time>
              <p className="text-card-foreground/80 flex-1 overflow-y-auto whitespace-pre-line break-words leading-relaxed md:max-h-[33rem]">
                {selectedEntry.content}
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default MapDiaries;
