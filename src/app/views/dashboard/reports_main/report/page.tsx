// app/reports/page.tsx
"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Grid, IconButton, Input, InputAdornment } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import {
  filterDataSelected,
  optionsReports,
  optionTypeColorReport,
} from "@/app/utils";
import { TypesCategory, TypesData } from "@/app/models/globalInfo.types";
import { listenToReports } from "@/firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ModalComponent from "@/app/components/ModalComponent";
import LoadingComponent from "@/app/components/LoadingComponent";
const MapWithMarkers = dynamic(() => import("@/app/components/MapComponent"), {
  ssr: false,
});

const PageReports = () => {
  // obtener reportes mediante el municipio del usuario
  const DEFAULT_POSITION: [number, number] = [19.4326, -99.1332]; // CDMX
  const router = useRouter();
  const user_info = useSelector((state: RootState) => state.context.user_info);
  // filtrar municipios por categoria
  const [selectedOption, setSelectedOption] = useState("");
  const [reports, setReports] = useState<TypesData[]>([]);
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>(DEFAULT_POSITION);
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<TypesData>({} as TypesData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!user_info.city) return;

    const getCoords = async () => {
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
          console.log("get coords");
          setCenter([lat, lon]);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error geolocalizando municipio:", err);
      }
    };

    getCoords();
    const unsubscribe = listenToReports(
      user_info.city,
      (data) => {
        console.log("Datos actualizados en tiempo real:", data);
        setReports(data); // tu estado local
      },
      (error: unknown) => {
        console.log("error", error);
        alert("Hubo un error al escuchar los reportes.");
      }
    );

    return () => {
      unsubscribe(); // Se detiene el listener cuando el componente se desmonta
    };
  }, []);

  const handleOptions = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
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

  const handleDelete = async (id: string) => {
    console.log("id delete", id);
  };
  const reportsFilts = useMemo(() => {
    if (!selectedOption) return reports;
    return filterDataSelected(reports, selectedOption);
  }, [reports, selectedOption]);
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
              handleSearch();
            }}
            size="small"
          >
            <SearchIcon htmlColor="white" />
          </IconButton>
          <select
            id="options"
            value={selectedOption}
            onChange={handleOptions}
            style={{
              height: "32px",
              borderRadius: ".5rem",
              paddingLeft: ".5rem",
            }}
          >
            <option value="">Mostrar Todas las categorias</option>
            {optionsReports.map((option: TypesCategory) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "2fr 2fr",
              md: "4fr 400px",
              lg: "3fr 400px",
            },
            height: "100%",
            justifyContent: { xs: "center", sm: "left" },
          }}
        >
          <div>
            {loading ? (
              <LoadingComponent text="Cargando Mapa..." />
            ) : (
              <MapWithMarkers
                optionTypeColor={optionTypeColorReport}
                center={center}
                markers={reportsFilts}
                onMarkerClick={(marker) => {
                  setReport(marker);
                  setOpen(true);
                }}
                isSetMarker={true}
              />
            )}
          </div>
          <div style={{ height: "100%", minWidth: "100%" }}>
            <>
              <ModalComponent
                open={open}
                onClose={() => setOpen(false)}
                report={report}
                onUpdate={(updatedReport) => setReport(updatedReport)}
                onDelete={handleDelete}
              />
            </>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default PageReports;
