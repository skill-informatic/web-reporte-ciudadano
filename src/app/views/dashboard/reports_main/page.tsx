"use client";

import CardContainer from "@/app/components/CardContainer";
import { CardTypes } from "@/app/models/globalInfo.types";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";

import React from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaClipboardList,
  FaMapMarkedAlt,
  FaRegFileAlt,
} from "react-icons/fa";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const cards: CardTypes[] = [
    {
      id: "report",
      icono: <FaCamera size={50} />,
      name: "Reportar",
      subtitle: "Captura un nuevo incidente o problema para seguimiento.",
      action: (id: string) => handlerAction(id),
    },
    {
      id: "reports",
      name: "Reportes",
      icono: <FaClipboardList size={50} />,
      subtitle: "Consulta el listado completo de todos los reportes activos.",
      action: (id: string) => handlerAction(id),
    },
    {
      id: "my_reports",
      name: "Mis Reportes",
      icono: <FaRegFileAlt size={50} />,
      subtitle: "Accede a los reportes que tú has generado.",
      action: (id: string) => handlerAction(id),
    },
    {
      id: "map_of_reports",
      name: "Mapa de Reportes",
      icono: <FaMapMarkedAlt size={50} />,
      subtitle: "Visualiza los reportes desde un Mapa",
      action: (id: string) => handlerAction(id),
    },
    {
      id: "completed_reports",
      icono: <FaCheckCircle size={50} />,
      name: "Reportes Finalizados",
      subtitle: "Visualiza reportes que ya han sido atendidos y cerrados.",
      action: (id: string) => handlerAction(id),
    },
  ];

  const handlerAction = (id: string) => {
    router.push(`/views/dashboard/reports_main/${id}`);
    console.log("id", id);
  };
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

          // justifyItems: "center",
          // rowGap: "1rem",
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
