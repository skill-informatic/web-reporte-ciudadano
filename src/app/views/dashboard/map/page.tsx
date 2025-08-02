// app/reports/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SearchInput from "@/app/components/SearchInput";
import { getCoordinatesFromQuery } from "@/app/utils";
const MapSimpleComponent = dynamic(
  () => import("@/app/components/MapSimpleComponent"),
  {
    ssr: false,
  }
);

const ReportMapPage = () => {
  const router = useRouter();
  const initial_coords = useSelector(
    (state: RootState) => state.context.initial_coords
  );

  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>(initial_coords);

  const handleSearch = async () => {
    if (!search.trim()) return;
    const coords = await getCoordinatesFromQuery(search);
    if (coords) {
      setCenter(coords);
    } else {
      alert("Ubicación no encontrada.");
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
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder={"Buscar Código Postal o Ciudad"}
          />
        </div>
        <MapSimpleComponent center={center} />
      </div>
    </div>
  );
};

export default ReportMapPage;
