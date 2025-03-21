"use client";

import { env } from "@erichandsen/env";
import { type LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface CdsMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  onMarkerClick?: () => void;
  popupContent?: string;
}

function CdsMap({
  latitude,
  longitude,
  zoom = 13,
  onMarkerClick,
  popupContent = "Location marker"
}: CdsMapProps) {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      className="size-full"
      zoomControl={false}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${env.NEXT_PUBLIC_MAPBOX_USER_ID}/${env.NEXT_PUBLIC_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker
        position={position}
        eventHandlers={{
          click: () => {
            onMarkerClick?.();
          }
        }}
      >
        <Popup>{popupContent}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default CdsMap;
