"use client";
import TableComponent from "@/app/components/TableComponent";
import React from "react";

const CompletedReports = () => {
  const headers = [
    { id: "id", label: "ID", numeric: false },
    { id: "nombre", label: "Nombre", numeric: false },
    { id: "ciudad", label: "Ciudad", numeric: false },
    { id: "telefono", label: "Teléfono", numeric: false },
    { id: "total", label: "Total", numeric: true },
  ];

  const rows = [
    {
      id: "1",
      nombre: "Mario Cortez",
      ciudad: "Acapulco",
      telefono: "7445288302",
      total: 1200,
    },
    {
      id: "2",
      nombre: "Ana López",
      ciudad: "CDMX",
      telefono: "5552148796",
      total: 3500,
    },
    {
      id: "3",
      nombre: "Juan Pérez",
      ciudad: "Guadalajara",
      telefono: "3321458965",
      total: 250,
    },
    {
      id: "4",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "5",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "6",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "7",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "8",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "9",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "10",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "11",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "12",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
    {
      id: "13",
      nombre: "Roberto Campos",
      ciudad: "Tijuana",
      telefono: "6642145789",
      total: 999,
    },
  ];

  const handleRowSelect = (id: string) => {
    console.log("Fila seleccionada:", id);
  };

  const getNextPage = (currentPage: number) => {
    console.log("Cambió a página:", currentPage);
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
        ></div>

        <div
          style={{
            margin: "0 auto",
            marginTop: "3rem",
            width: "90%",
          }}
        >
          <TableComponent
            rows={rows}
            totalFilas={10} // cantidad de filas por página
            titulo="Listado de Clientes"
            tituloRight="Reporte Mensual"
            headers={headers}
            paginacion={true}
            conTotal={true}
            totalCenter={"Clientes: 4"} // texto en el centro
            totalRight={rows.reduce((acc, row) => acc + row.total, 0)} // suma total
            tamanioFijo="400px"
            selectorActivo={true}
            ordenamiento={true}
            total={rows.length} // número total de registros
            getNextPage={getNextPage}
            seleccionDeRow={handleRowSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedReports;
