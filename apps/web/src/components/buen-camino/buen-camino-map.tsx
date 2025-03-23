"use client";

import { type DiaryEntry } from "@erichandsen/dal";
import { env } from "@erichandsen/env";
import {
  divIcon,
  type LatLngExpression,
  type LeafletEvent,
  type Marker as LeafletMarker,
  point
} from "leaflet";
import { Icon } from "leaflet";
import Image from "next/image";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import DiaryListDialog from "./diary-list-dialog";

const SJPP_COORDINATES: LatLngExpression = [43.163_01, -1.2399];

const SHELL_SVG =
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Shell</title><path fill="#FFFFFF" d="M12 .863C5.34.863 0 6.251 0 12.98c0 .996.038 1.374.246 2.33l3.662 2.71.57 4.515h6.102l.326.227c.377.262.705.375 1.082.375.352 0 .732-.101 1.024-.313l.39-.289h6.094l.563-4.515 3.695-2.71c.208-.956.246-1.334.246-2.33C24 6.252 18.661.863 12 .863zm.996 2.258c.9 0 1.778.224 2.512.649l-2.465 12.548 3.42-12.062c1.059.36 1.863.941 2.508 1.814l.025.034-4.902 10.615 5.572-9.713.033.03c.758.708 1.247 1.567 1.492 2.648l-6.195 7.666 6.436-6.5.01.021c.253.563.417 1.36.417 1.996 0 .509-.024.712-.164 1.25l-3.554 2.602-.467 3.71h-4.475l-.517.395c-.199.158-.482.266-.682.266-.199 0-.483-.108-.682-.266l-.517-.394H6.322l-.445-3.61-3.627-2.666c-.11-.436-.16-.83-.16-1.261 0-.72.159-1.49.426-2.053l.013-.024 6.45 6.551L2.75 9.621c.25-1.063.874-2.09 1.64-2.713l5.542 9.776L4.979 6.1c.555-.814 1.45-1.455 2.546-1.827l3.424 12.069L8.355 3.816l.055-.03c.814-.45 1.598-.657 2.457-.657.195 0 .286.004.528.03l.587 13.05.46-13.059c.224-.025.309-.029.554-.029z"/></svg>';

const createShellIcon = (current: boolean) =>
  new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(
      SHELL_SVG.replace("#FFFFFF", current ? "hsl(47.9 95.8% 53.1%)" : "#FFFFFF")
    )}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    shadowUrl: "",
    shadowSize: [0, 0],
    shadowAnchor: [0, 0]
  });

type Cluster = {
  getChildCount: () => number;
  getAllChildMarkers: () => LeafletMarker[];
};

const createClusterCustomIcon = (cluster: Cluster) => {
  const markers = cluster.getAllChildMarkers();
  const isOneMarkerSelected = markers.some((marker) => marker.options.opacity === 1);
  return divIcon({
    html: `<span class="text-sm font-bold text-white font-[family-name:var(--font-montserrat)] h-12 w-12 flex items-center justify-center rounded-full ${
      isOneMarkerSelected ? "bg-primary/50" : "bg-white/50"
    }">${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: point(40, 40, true)
  });
};

function RecenterMapDiaryListDialog({
  selectedEntry,
  onSelectEntry,
  diaries,
  onMarkerPopupOpen
}: {
  selectedEntry: DiaryEntry | undefined;
  onSelectEntry: (entry: DiaryEntry) => void;
  diaries: DiaryEntry[];
  onMarkerPopupOpen: (entryId: number) => void;
}) {
  const map = useMap();
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (isOpen: boolean, entry?: DiaryEntry) => {
      setOpen(isOpen);
      if (!isOpen && entry) {
        map.flyTo([Number(entry.latitude), Number(entry.longitude)], 15);
        onMarkerPopupOpen(entry.id);
      }
    },
    [map, onMarkerPopupOpen]
  );

  return (
    <DiaryListDialog
      diaries={diaries}
      onSelectEntry={onSelectEntry}
      open={open}
      onOpenChange={handleOpenChange}
      selectedEntry={selectedEntry}
    />
  );
}

type Props = {
  diaries: DiaryEntry[];
  selectedEntry: DiaryEntry | undefined;
  onSelectEntry: (entry: DiaryEntry) => void;
};

function BuenCaminoMap({ diaries, selectedEntry, onSelectEntry }: Props) {
  const markerRefs = useMemo(
    () =>
      diaries.reduce<Record<string, React.RefObject<LeafletMarker | null>>>((acc, entry) => {
        return {
          ...acc,
          // eslint-disable-next-line @eslint-react/no-create-ref -- this is a workaround for the fact that we can't use useRef here
          [entry.id]: createRef<LeafletMarker>()
        };
      }, {}),
    [diaries]
  );

  const handleMarkerClick = useCallback(
    (e: LeafletEvent, entry: DiaryEntry) => {
      e.target.openPopup();
      onSelectEntry(entry);
    },
    [onSelectEntry]
  );

  const handleMarkerPopupOpen = useCallback(
    (entryId: number) => {
      // This is a workaround to open the popup after the marker is rendered
      setTimeout(() => {
        markerRefs[entryId]?.current?.openPopup();
      }, 3000);
    },
    [markerRefs]
  );

  const selectedEntryId = selectedEntry?.id;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (selectedEntryId) {
      timeout = setTimeout(() => {
        markerRefs[selectedEntryId]?.current?.openPopup();
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedEntryId, markerRefs]);

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

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        showCoverageOnHover={false}
      >
        {diaries.map((entry) => (
          <Marker
            opacity={entry.id === selectedEntry?.id ? 1 : 0.5}
            key={entry.id}
            ref={markerRefs[entry.id]}
            position={[Number(entry.latitude), Number(entry.longitude)]}
            icon={createShellIcon(entry.id === selectedEntry?.id)}
            eventHandlers={{
              click: (e) => {
                handleMarkerClick(e, entry);
              },
              mouseover: (e) => {
                e.target.openPopup();
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
                    sizes="20vw"
                  />
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <RecenterMapDiaryListDialog
        diaries={diaries}
        onSelectEntry={onSelectEntry}
        onMarkerPopupOpen={handleMarkerPopupOpen}
        selectedEntry={selectedEntry}
      />
    </MapContainer>
  );
}

export default BuenCaminoMap;
