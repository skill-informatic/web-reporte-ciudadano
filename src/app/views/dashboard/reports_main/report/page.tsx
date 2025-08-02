// app/reports/page.tsx
"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Grid } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

import { useRouter } from "next/navigation";
import {
  filterDataSelected,
  getCoordinatesFromQuery,
  optionsReports,
  optionTypeColorReport,
} from "@/app/utils";
import { TypesData } from "@/app/models/globalInfo.types";
import { listenToReports } from "@/firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ModalComponent from "@/app/components/ModalComponent";
import LoadingComponent from "@/app/components/LoadingComponent";
import SelectComponent from "@/app/components/SelectComponenet";
import SearchInput from "@/app/components/SearchInput";

const MapWithMarkers = dynamic(() => import("@/app/components/MapComponent"), {
  ssr: false,
});

const PageReports = () => {
  const initial_coords = useSelector(
    (state: RootState) => state.context.initial_coords
  );
  const router = useRouter();
  const user_info = useSelector((state: RootState) => state.context.user_info);

  const [selectedOption, setSelectedOption] = useState("");
  const [reports, setReports] = useState<TypesData[]>([]);
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>(initial_coords);
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<TypesData>({} as TypesData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!user_info.city) return;

    const loadInitialCoords = async () => {
      const coords = await getCoordinatesFromQuery(user_info.city + ", México");
      if (coords) {
        setCenter(coords);
      }
      setLoading(false);
    };

    loadInitialCoords();

    const unsubscribe = listenToReports(
      user_info.city,
      (data) => {
        console.log("Datos actualizados en tiempo real:", data);
        setReports(data);
      },
      (error: unknown) => {
        console.log("error", error);
        alert("Hubo un error al escuchar los reportes.");
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOptions = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    const coords = await getCoordinatesFromQuery(search);
    if (coords) {
      setCenter(coords);
    } else {
      alert("Ubicación no encontrada.");
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
          <Button onClick={() => router.back()}>
            <FaArrowLeft size={20} color="#FFF" />
          </Button>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder={"Buscar Código Postal o Ciudad"}
          />
          <SelectComponent
            options={optionsReports}
            selectedOption={selectedOption}
            onChange={handleOptions}
          />
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
            <ModalComponent
              open={open}
              onClose={() => setOpen(false)}
              report={report}
              onUpdate={(updatedReport) => setReport(updatedReport)}
              onDelete={handleDelete}
            />
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default PageReports;
