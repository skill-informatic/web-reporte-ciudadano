// app/reports/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button, IconButton, Input, InputAdornment } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
const MapSimpleComponent = dynamic(
  () => import("@/app/components/MapSimpleComponent"),
  {
    ssr: false,
  }
);

const ReportMapPage = () => {
  // obtener reportes mediante el municipio del usuario
  const DEFAULT_POSITION: [number, number] = [19.4326, -99.1332]; // CDMX
  const router = useRouter();
  const user_info = useSelector((state: RootState) => state.context.user_info);
  // filtrar municipios por categoria

  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>(DEFAULT_POSITION);
  useEffect(() => {
    if (!user_info.city) return;
    console.log("render");
    const getCoords = async () => {
      console.log("render");
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            user_info.city + ", México"
          )}`
        );
        const data = await response.json();
        if (data?.[0]) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setCenter([lat, lon]);
        }
      } catch (err) {
        console.error("Error geolocalizando municipio:", err);
      }
    };

    getCoords();
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
        setCenter([parseFloat(lat), parseFloat(lon)]);
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
          {/* hacer que regrese a la pagina anterior */}
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
          <IconButton
            onClick={() => {
              // handleSearch

              console.log("search");
            }}
            size="small"
          >
            <SearchIcon htmlColor="white" />
          </IconButton>
        </div>
        <MapSimpleComponent center={center} />
      </div>
    </div>
  );
};

export default ReportMapPage;
