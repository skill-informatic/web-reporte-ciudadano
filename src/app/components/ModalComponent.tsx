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
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { TypesData } from "../models/globalInfo.types";

type Props = {
  open: boolean;
  onClose: () => void;
  report: TypesData;
  onUpdate?: (updated: TypesData) => void;
  onDelete?: (id: string) => void;
};

const ModalComponent: React.FC<Props> = ({
  open,
  onClose,
  report,
  onUpdate,
  onDelete,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [editableReport, setEditableReport] = useState<TypesData>(report);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableReport(report);
    setIsEditing(false);
    setTabIndex(0);
  }, [report]);

  const handleChange = (field: keyof TypesData, value: string) => {
    setEditableReport((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (onUpdate) onUpdate(editableReport);
    setIsEditing(false);
  };

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
                // borderRadius: 1,
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

            {isEditing ? (
              <>
                <TextField
                  label="Título"
                  fullWidth
                  margin="dense"
                  value={editableReport.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <TextField
                  label="Estado"
                  fullWidth
                  margin="dense"
                  value={editableReport.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
                <TextField
                  label="Categoría"
                  fullWidth
                  margin="dense"
                  value={editableReport.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                />
                <TextField
                  label="Descripción"
                  fullWidth
                  margin="dense"
                  value={editableReport.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  multiline
                  rows={6}
                />
              </>
            ) : (
              <>
                <Box mt={1}>
                  <Typography fontWeight="bold">Título:</Typography>
                  <Typography>{editableReport.title}</Typography>
                </Box>
                <Box mt={1}>
                  <Typography fontWeight="bold">Estado:</Typography>
                  <Typography>{editableReport.status}</Typography>
                </Box>
                <Box height={4} bgcolor="#F44336" borderRadius={1} my={1} />
                <Box mt={1}>
                  <Typography fontWeight="bold">Categoría:</Typography>
                  <Typography>{editableReport.category}</Typography>
                </Box>
                <Box height={4} bgcolor="black" borderRadius={1} my={1} />
                <Box mt={1}>
                  <Typography fontWeight="bold">Descripción:</Typography>
                  <Typography>{editableReport.content}</Typography>
                </Box>
              </>
            )}

            <Typography align="right" fontSize="small" mt={2}>
              {editableReport.city}, {editableReport.state}
            </Typography>
          </>
        ) : (
          <Typography mt={2}>
            Aquí irían los comentarios del reporte... (puedes colocar una lista
            o TextField aquí según lo que necesites).
          </Typography>
        )}
      </DialogContent>

      {/* Botones fijos al final */}
      <Box p={2} display="flex" flexDirection="column" gap={1}>
        {tabIndex === 0 && (
          <Box display="flex" gap={2}>
            {isEditing ? (
              <Button
                variant="contained"
                fullWidth
                onClick={handleSave}
                sx={{
                  backgroundColor: "#8B5CF6",
                  "&:hover": { backgroundColor: "#7B1FA2" },
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
                  "&:hover": { backgroundColor: "#7B1FA2" },
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
        )}

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
