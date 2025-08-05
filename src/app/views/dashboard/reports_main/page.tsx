"use client";

import CardContainer from "@/app/components/CardContainer";
import { CardTypes } from "@/app/models/globalInfo.types";
import { Grid } from "@mui/material";

import React from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaClipboardList,
  FaMapMarkedAlt,
  FaRegFileAlt,
} from "react-icons/fa";

const page = () => {
  const cards: CardTypes[] = [
    {
      id: "report",
      route: "/views/dashboard/reports_main/report",
      icono: <FaCamera size={50} />,
      name: "Reportar",
      subtitle: "Captura un nuevo incidente o problema para seguimiento.",
    },
    {
      id: "reports",
      route: "/views/dashboard/reports_main/reports",
      name: "Reportes",
      icono: <FaClipboardList size={50} />,
      subtitle: "Consulta el listado completo de todos los reportes activos.",
    },
    {
      id: "my_reports",
      route: "/views/dashboard/reports_main/my_reports",
      name: "Mis Reportes",
      icono: <FaRegFileAlt size={50} />,
      subtitle: "Accede a los reportes que tú has generado.",
    },
    {
      id: "map_of_reports",
      route: "/views/dashboard/reports_main/map_of_reports",
      name: "Mapa de Reportes",
      icono: <FaMapMarkedAlt size={50} />,
      subtitle: "Visualiza los reportes desde un Mapa",
    },
    {
      id: "completed_reports",
      route: "/views/dashboard/reports_main/completed_reports",
      icono: <FaCheckCircle size={50} />,
      name: "Reportes Finalizados",
      subtitle: "Visualiza reportes que ya han sido atendidos y cerrados.",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "2fr 2fr",
            md: "4fr 400px",
            lg: "3fr 400px",
          },
          columnGap: "1rem",
          height: "100%",
          justifyContent: { xs: "center", sm: "left" },
        }}
      >
        <div style={{ margin: "3.75rem", marginTop: "2.5rem" }}>
          <CardContainer cards={cards} />
        </div>
        <div style={{ height: "100%", minWidth: "100%" }}></div>
      </Grid>
    </div>
  );
};

export default page;
