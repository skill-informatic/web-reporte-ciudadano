"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {
  TypeCategory,
  TypeDataGet,
  TypeDataPost,
  TypeUserInfo,
} from "../models/globalInfo.types";
import { calculateRows, formatDate, optionsReports } from "../utils";
import TextInputComponent from "./TextInputComponent";
import PickerComponent from "./PickerComponent";
import TextareaComponent from "./TextareaComponent";

type Props = {
  open: boolean;
  onClose: () => void;
  report: TypeDataGet;
  onUpdate?: (updated: TypeDataGet) => void;
  onDelete?: (id: string) => void;
  status: TypeCategory[];
  optionTypeColor: {
    [key: string]: string;
  };
  user_info: TypeUserInfo;
};

const ModalComponent: React.FC<Props> = ({
  open,
  onClose,
  report,
  onUpdate,
  onDelete,
  status,
  optionTypeColor,
  user_info,
}) => {
  console.log("report", report);
  const [tabIndex, setTabIndex] = useState(0);
  const [editableReport, setEditableReport] = useState<TypeDataGet>(report);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableReport(report);
    setIsEditing(false);
    setTabIndex(0);
  }, [report]);

  const handleChange = (field: keyof TypeDataPost, value: string) => {
    setEditableReport((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (onUpdate) onUpdate(editableReport);
    setIsEditing(false);
  };

  // Traer desde props status
  const getStatusLabel = (value: string) =>
    status.find((s) => s.value === value)?.label || value;

  //traer desde props optionsReports
  const getCategoryLabel = (value: string) =>
    optionsReports.find((c) => c.value === value)?.label || value;
  console.log(editableReport.created_at);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ p: 0 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, val) => setTabIndex(val)}
          TabIndicatorProps={{ style: { backgroundColor: "#8B5CF6" } }}
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label="Reporte"
            sx={{
              fontWeight: "bold",
              color: tabIndex === 0 ? "#8B5CF6" : "inherit",
            }}
          />
          <Tab
            label="Comentarios"
            sx={{
              fontWeight: "bold",
              color: tabIndex === 1 ? "#8B5CF6" : "inherit",
            }}
          />
        </Tabs>
      </DialogTitle>

      <DialogContent>
        {tabIndex === 0 ? (
          <>
            <Box
              mt={1}
              sx={{
                width: "100%",
                minHeight: 250,
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={editableReport.image_url}
                alt="Imagen del reporte"
                fill
                style={{
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />
            </Box>

            {/* Título */}
            <Box
              mt={2}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography fontWeight="bold">Título:</Typography>
              {isEditing ? (
                <TextInputComponent
                  placeholder="Título..."
                  type="text"
                  value={editableReport.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: "1rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {editableReport.title}
                </Typography>
              )}
            </Box>

            {/* Estado */}
            <Box
              mt={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography fontWeight="bold">Estado:</Typography>
              {isEditing ? (
                <PickerComponent
                  selectedOption={editableReport.status}
                  options={status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: "1rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {getStatusLabel(editableReport.status)}
                </Typography>
              )}
            </Box>

            <Box height={4} bgcolor="#F44336" borderRadius={1} my={1} />

            {/* Categoría */}
            <Box
              mt={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography fontWeight="bold">Categoría:</Typography>
              {isEditing ? (
                <PickerComponent
                  selectedOption={editableReport.category}
                  options={optionsReports}
                  onChange={(e) => handleChange("category", e.target.value)}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: "1rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {getCategoryLabel(editableReport.category)}
                </Typography>
              )}
              <Box
                height={4}
                bgcolor={optionTypeColor[editableReport.category]}
                borderRadius={1}
                my={1}
              />
            </Box>

            {/* Descripción */}
            <Box
              mt={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography fontWeight="bold">Descripción:</Typography>
              {isEditing ? (
                <TextareaComponent
                  placeholder="Descripción..."
                  value={editableReport.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  rows={calculateRows(editableReport.content)}
                />
              ) : (
                <Typography sx={{ fontSize: "1rem", minHeight: "6rem" }}>
                  {editableReport.content}
                </Typography>
              )}
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Box
                component={"div"}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <Typography fontWeight="bold" align="left" fontSize="small">
                  Creado el:{" "}
                </Typography>
                {editableReport.created_at ? (
                  <Typography align="left" fontSize="small">
                    {formatDate(editableReport.created_at)}
                  </Typography>
                ) : null}
              </Box>
              <Typography align="right" fontSize="small">
                {editableReport.city}, {editableReport.state}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography mt={2}>
            Aquí irían los comentarios del reporte...
          </Typography>
        )}
      </DialogContent>

      <Box p={2} display="flex" flexDirection="column" gap={1}>
        {user_info.role === "supervisor" ||
          (user_info.role === "admin" && tabIndex === 0 && (
            <Box display="flex" gap={2}>
              {isEditing ? (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#8B5CF6",
                    "&:hover": { backgroundColor: "#8B5CF9" },
                  }}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                  sx={{
                    backgroundColor: "#8B5CF6",
                    "&:hover": { backgroundColor: "#8B5CF9" },
                  }}
                >
                  Editar
                </Button>
              )}

              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => onDelete?.(editableReport.id)}
              >
                Eliminar
              </Button>
            </Box>
          ))}

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#8B5CF6" }}
          onClick={onClose}
        >
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};

export default ModalComponent;
