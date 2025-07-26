// src/app/views/dashboard/map/MapView.tsx

/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaArrowLeft } from "react-icons/fa";
import { Input, InputAdornment, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getYourApproximateLocation } from "@/app/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    typeof window !== "undefined"
      ? require("leaflet/dist/images/marker-icon-2x.png")
      : "",
  iconUrl:
    typeof window !== "undefined"
      ? require("leaflet/dist/images/marker-icon.png")
      : "",
  shadowUrl:
    typeof window !== "undefined"
      ? require("leaflet/dist/images/marker-shadow.png")
      : "",
});

const DEFAULT_POSITION: LatLngExpression = [19.4326, -99.1332];

const MapUpdater = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  map.setView(position, 13);
  return null;
};

const MapView = () => {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState<LatLngExpression>(DEFAULT_POSITION);
  const router = useRouter();

  useEffect(() => {
    getYourApproximateLocation()
      .then((coords) => setPosition(coords))
      .catch((error) => console.warn("No se pudo obtener ubicación:", error));
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Ubicación no encontrada.");
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      alert("Error al buscar ubicación.");
    }
  };

  return (
    <div style={{ maxHeight: "100%", width: "100%" }}>
      <div style={{ height: "calc(100% - 50px)", width: "100%" }}>
        <div
          style={{
            display: "flex",
            background: "#8B5CF6",
            height: "50px",
            alignItems: "center",
            padding: "0 1rem",
            gap: "1rem",
          }}
        >
          <Button onClick={() => router.back()}>
            <FaArrowLeft size={20} color="#FFF" />
          </Button>

          <Input
            placeholder="Buscar Código Postal o Ciudad"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              paddingLeft: "0.5rem",
              height: "32px",
              fontSize: "14px",
              width: "250px",
            }}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            }
          />
          <IconButton onClick={handleSearch} size="small">
            <SearchIcon htmlColor="white" />
          </IconButton>
        </div>

        <MapContainer
          center={position}
          zoom={20}
          style={{ height: "100%", width: "100%" }}
        >
          <MapUpdater position={position} />
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
