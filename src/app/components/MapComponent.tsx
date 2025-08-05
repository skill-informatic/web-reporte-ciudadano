"use client";

import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TypeCoord, TypeDataGet } from "../models/globalInfo.types";
import { pinPopIcon } from "@/assets/icons";

interface MapWithMarkersProps {
  optionTypeColor: { [key: string]: string };
  center: [number, number];
  markers: TypeDataGet[];
  onMarkerClick?: (marker: TypeDataGet) => void;
  onSelectedPoint?: (point: TypeCoord) => void;
  selectedPoint?: TypeCoord | null;
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
  onSelectedPoint,
  selectedPoint,
  isSetMarker = false,
}) => {
  const InternalClickHandler = () => {
    useMapEvents({
      click(e) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();

        const coords = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };

        if (onSelectedPoint) {
          onSelectedPoint(coords);
        }

        console.log("Coordenadas seleccionadas:", coords);
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
      {isSetMarker && <InternalClickHandler />}
      <ChangeView center={center} />
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker: TypeDataGet) => (
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
        />
      ))}
      {selectedPoint?.latitude && selectedPoint?.longitude && (
        <Marker
          position={[selectedPoint.latitude, selectedPoint.longitude]}
          icon={pinPopIcon}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
