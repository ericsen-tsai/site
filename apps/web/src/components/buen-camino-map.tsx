"use client";

import { type DiaryEntry } from "@erichandsen/dal";
import { env } from "@erichandsen/env";
import { type LatLngExpression } from "leaflet";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface BuenCaminoMapProps {
  diaries: DiaryEntry[];
}

const SJPP_COORDINATES: LatLngExpression = [43.163_01, -1.2399];

// Custom marker icon with theme color
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAyYy0yLjIgMC00IDEuOC00IDRzMS44IDQgNCA0IDQtMS44IDQtNC0xLjgtNC00LTR6Ii8+PHBhdGggZD0iTTEyIDIyYy0yLjIgMC00LTEuOC00LTRzMS44LTQgNC00IDQgMS44IDQgNC0xLjggNC00IDR6Ii8+PC9zdmc+",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
  shadowUrl: "",
  shadowSize: [0, 0],
  shadowAnchor: [0, 0]
});

function BuenCaminoMap({ diaries }: BuenCaminoMapProps) {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry>(() => {
    if (diaries.length === 0) return SJPP_COORDINATES;
    const latestDiary = diaries.toSorted(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )[0];
    return latestDiary;
  });

  return (
    <div className="grid h-[calc(100vh-5rem)] grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 h-full">
        <MapContainer
          center={[selectedEntry.latitude, selectedEntry.longitude]}
          zoom={13}
          className="size-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/${env.NEXT_PUBLIC_MAPBOX_USER_ID}/${env.NEXT_PUBLIC_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />

          <MarkerClusterGroup chunkedLoading>
            {diaries.map((entry) => (
              <Marker
                key={entry.id}
                position={[entry.latitude, entry.longitude]}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedEntry(entry);
                  }
                }}
              >
                <Popup>
                  {entry.heroImageUrl && (
                    <div className="relative size-32 overflow-hidden rounded-lg">
                      <Image
                        src={entry.heroImageUrl}
                        alt={entry.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      <div className="h-full overflow-y-auto border-t p-4 md:border-l md:border-t-0">
        <article className="grid grid-cols-1 gap-4">
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">{selectedEntry.title}</h4>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="size-3" />
              <span>
                {selectedEntry.latitude}, {selectedEntry.longitude}
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
            <p className="text-card-foreground/80 line-clamp-[16] leading-relaxed">
              {selectedEntry.content}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BuenCaminoMap;
