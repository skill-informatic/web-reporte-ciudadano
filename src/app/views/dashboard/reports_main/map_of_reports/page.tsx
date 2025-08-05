// app/reports/page.tsx
"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  filterDataSelected,
  getCoordinatesFromQuery,
  optionsReports,
  optionTypeColorReport,
  status,
} from "@/app/utils";
import { TypeDataGet } from "@/app/models/globalInfo.types";
import { listenToReports } from "@/firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SelectComponent from "@/app/components/SelectComponenet";
import SearchInput from "@/app/components/SearchInput";
import ModalComponent from "@/app/components/ModalComponent";
const MapWithMarkers = dynamic(() => import("@/app/components/MapComponent"), {
  ssr: false,
});

const ReportMapPage = () => {
  const router = useRouter();
  const user_info = useSelector((state: RootState) => state.context.user_info);
  const initial_coords = useSelector(
    (state: RootState) => state.context.initial_coords
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [reports, setReports] = useState<TypeDataGet[]>([]);
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>(initial_coords);
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<TypeDataGet>({} as TypeDataGet);

  useEffect(() => {
    if (!user_info.city) return;

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
  const handleClose = async () => {
    setOpen(false);
  };
  const handleDelete = async (id: string) => {
    setOpen(false);
    console.log("id delete", id);
  };
  const handleUpdate = async (updatedReport: TypeDataGet) => {
    // setOpen(false);
    setReport(updatedReport);
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

        <MapWithMarkers
          optionTypeColor={optionTypeColorReport}
          center={center}
          markers={reportsFilts}
          onMarkerClick={(marker) => {
            setReport(marker);
            setOpen(true);
          }}
        />
        <ModalComponent
          user_info={user_info}
          open={open}
          onClose={handleClose}
          report={report}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          status={status}
          optionTypeColor={optionTypeColorReport}
        />
      </div>
    </div>
  );
};

export default ReportMapPage;
