"use client";

import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapWithMarkersProps {
  center: [number, number];
}

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 12);
  return null;
};

const MapSimpleComponent: React.FC<MapWithMarkersProps> = ({ center }) => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ maxHeight: "100%", height: "100%", width: "100%" }}
    >
      <ChangeView center={center} />
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapSimpleComponent;
