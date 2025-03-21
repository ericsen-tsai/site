"use client";

import { type DiaryEntry } from "@erichandsen/dal";
import { env } from "@erichandsen/env";
import { type LatLngExpression } from "leaflet";
import { divIcon, Icon, point } from "leaflet";
import Image from "next/image";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const SJPP_COORDINATES: LatLngExpression = [43.163_01, -1.2399];

const SHELL_SVG =
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Shell</title><path fill="#FFFFFF" d="M12 .863C5.34.863 0 6.251 0 12.98c0 .996.038 1.374.246 2.33l3.662 2.71.57 4.515h6.102l.326.227c.377.262.705.375 1.082.375.352 0 .732-.101 1.024-.313l.39-.289h6.094l.563-4.515 3.695-2.71c.208-.956.246-1.334.246-2.33C24 6.252 18.661.863 12 .863zm.996 2.258c.9 0 1.778.224 2.512.649l-2.465 12.548 3.42-12.062c1.059.36 1.863.941 2.508 1.814l.025.034-4.902 10.615 5.572-9.713.033.03c.758.708 1.247 1.567 1.492 2.648l-6.195 7.666 6.436-6.5.01.021c.253.563.417 1.36.417 1.996 0 .509-.024.712-.164 1.25l-3.554 2.602-.467 3.71h-4.475l-.517.395c-.199.158-.482.266-.682.266-.199 0-.483-.108-.682-.266l-.517-.394H6.322l-.445-3.61-3.627-2.666c-.11-.436-.16-.83-.16-1.261 0-.72.159-1.49.426-2.053l.013-.024 6.45 6.551L2.75 9.621c.25-1.063.874-2.09 1.64-2.713l5.542 9.776L4.979 6.1c.555-.814 1.45-1.455 2.546-1.827l3.424 12.069L8.355 3.816l.055-.03c.814-.45 1.598-.657 2.457-.657.195 0 .286.004.528.03l.587 13.05.46-13.059c.224-.025.309-.029.554-.029z"/></svg>';

const ShellIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(SHELL_SVG)}`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
  shadowUrl: "",
  shadowSize: [0, 0],
  shadowAnchor: [0, 0]
});

type Cluster = {
  getChildCount: () => number;
};

const createClusterCustomIcon = (cluster: Cluster) => {
  return divIcon({
    html: `<span class="text-sm font-bold text-white font-[family-name:var(--font-montserrat)] h-12 w-12 flex items-center justify-center rounded-full bg-primary/30">${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: point(40, 40, true)
  });
};

type Props = {
  diaries: DiaryEntry[];
  selectedEntry: DiaryEntry | undefined;
  onSelectEntry: (entry: DiaryEntry) => void;
};

function BuenCaminoMap({ diaries, selectedEntry, onSelectEntry }: Props) {
  return (
    <MapContainer
      center={
        selectedEntry
          ? [Number(selectedEntry.latitude), Number(selectedEntry.longitude)]
          : SJPP_COORDINATES
      }
      zoom={13}
      className="size-full rounded-xl"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${env.NEXT_PUBLIC_MAPBOX_USER_ID}/${env.NEXT_PUBLIC_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {diaries.map((entry) => (
          <Marker
            key={entry.id}
            position={[Number(entry.latitude), Number(entry.longitude)]}
            icon={ShellIcon}
            eventHandlers={{
              click: (e) => {
                e.target.openPopup();
                onSelectEntry(entry);
              },
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              }
            }}
          >
            <Popup
              className="[&>div:last-child>div]:bg-background/80 [&>div:first-child>div]:!m-0 [&>div:first-child>div]:!w-min [&>div:first-child]:bg-transparent [&>div:last-child>div]:shadow-lg"
              closeButton={false}
            >
              {entry.heroImageUrl && (
                <div className="relative size-64 overflow-hidden rounded-lg">
                  <Image
                    src={entry.heroImageUrl}
                    alt={entry.title}
                    fill
                    className="object-cover"
                    loading="eager"
                  />
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default BuenCaminoMap;
