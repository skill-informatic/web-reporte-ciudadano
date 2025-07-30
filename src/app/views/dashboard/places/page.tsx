"use client";

import CardContainer from "@/app/components/CardContainer";
import { CardTypes } from "@/app/models/globalInfo.types";
import { Grid } from "@mui/material";

import React from "react";
import { FaMapMarkedAlt, FaRegFileAlt, FaCamera } from "react-icons/fa";

const page = () => {
  const cards: CardTypes[] = [
    {
      id: "",
      route: "",
      icono: <FaCamera size={50} />,
      name: "Subir Sitio",
      subtitle: "Registra un nuevo sitio de interés en tu localidad.",
    },
    {
      id: "",
      route: "",
      icono: <FaRegFileAlt size={50} />,
      name: "Sitios",
      subtitle: "Explora todos los sitios registrados en la plataforma.",
    },
    {
      id: "",
      route: "",
      icono: <FaRegFileAlt size={50} />,
      name: "Mis Sitios",
      subtitle: "Consulta y administra los sitios que tú has registrado.",
    },
    {
      id: "",
      route: "",
      icono: <FaMapMarkedAlt size={50} />,
      name: "Mapa de Sitios",
      subtitle: "Visualiza los sitios de interés sobre un mapa.",
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
