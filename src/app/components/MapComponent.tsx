// components/MapComponent.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TypesData } from "../models/globalInfo.types";
import { pinPopIcon } from "@/assets/icons";
//hacer las variables mas genericas y los types igual para que pueda ser mas reutilizable
interface MapWithMarkersProps {
  optionTypeColor: { [key: string]: string };
  center: [number, number];
  markers: TypesData[];
  onMarkerClick?: (marker: TypesData) => void;
  isSetMarker?: boolean;
}
const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};
const MapComponent: React.FC<MapWithMarkersProps> = ({
  optionTypeColor,
  center,
  markers,
  onMarkerClick,
  isSetMarker = false,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  //pasar por props handler selected marker
  const InternalClickHandler = () => {
    useMapEvents({
      click(e) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        setSelectedMarker({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
        console.log("Coordenadas seleccionadas:", e.latlng);
      },
    });
    return null;
  };
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ maxHeight: "100%", height: "100%", width: "100%" }}
    >
      {/* <ChangeView center={center} /> */}
      {isSetMarker ? <InternalClickHandler /> : null}
      <ChangeView center={center} />
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker: TypesData) => (
        <Marker
          key={marker.id}
          position={[marker.coords.latitude, marker.coords.longitude]}
          eventHandlers={{
            click: () => onMarkerClick?.(marker),
          }}
          icon={L.divIcon({
            html: `<div style="background:${
              optionTypeColor[marker.category]
            };width:16px;height:16px;border-radius:8px;border:2px solid white;"></div>`,
            className: "",
            iconSize: [16, 16],
          })}
        ></Marker>
      ))}
      {selectedMarker && (
        <Marker
          position={[selectedMarker.latitude, selectedMarker.longitude]}
          icon={pinPopIcon}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
