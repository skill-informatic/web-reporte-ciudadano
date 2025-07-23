"use client";

import CardContainer from "@/app/components/CardContainer";
import { CardTypes } from "@/app/models/globalInfo.types";
import { Grid } from "@mui/material";

import React from "react";

const page = () => {
  const cards: CardTypes[] = [
    {
      icono: "1",
      name: "Reportar",
      subtitle: "Generar nuevo reporte con captura y ve los ya reportados",
      action: () => console.log("first"),
    },
    {
      icono: "2",
      name: "Reportes",
      subtitle: "Generar nuevo reporte con captura y ve los ya reportados",

      action: () => console.log("first"),
    },
    {
      icono: "3",
      name: "Mis Reportes",
      subtitle: "Generar nuevo reporte con captura y ve los ya reportados",

      action: () => console.log("first"),
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
        }}
      >
        <div style={{ margin: "3.75rem", marginTop: "2.5rem" }}>
          <CardContainer cards={cards} />
        </div>
        <div
          style={{ background: "red", height: "100%", minWidth: "100%" }}
        ></div>
      </Grid>
    </div>
  );
};

export default page;
