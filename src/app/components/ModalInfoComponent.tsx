"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";

interface ViewInfo {
  title: string;
  content: string;
  category: string;
}

interface ModalInfoProps {
  id_user?: string;
  data: any;
  visible: boolean;
  onClose: () => void;
  deleteData: (data: any) => Promise<void>;
  putData: (data: any) => Promise<void>;
  categoryTypeText: { [key: string]: string };
  categories: { value: string; label: string }[];
  categoryTypeColor: { [key: string]: string };
}

const ModalInfoComponent: React.FC<ModalInfoProps> = ({
  id_user,
  data,
  visible,
  onClose,
  deleteData,
  putData,
  categoryTypeText,
  categories,
  categoryTypeColor,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [info, setInfo] = useState<ViewInfo>({
    title: data.title,
    content: data.content,
    category: data.category,
  });
  const [activeTab, setActiveTab] = useState(0);

  const isOwner = data?.id_user === id_user;

  const handleSave = () => {
    if (!data) return;
    const updatedReport = {
      ...data,
      title: info.title,
      content: info.content,
      category: info.category,
    };
    putData(updatedReport);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (confirm("¿Eliminar reporte? Esta acción no se puede deshacer.")) {
      await deleteData(data);
    }
  };

  return (
    <Dialog open={visible} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Reporte</DialogTitle>

      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
      >
        <Tab label="Reporte" />
      </Tabs>

      <DialogContent dividers>
        {data.image_url ? (
          <Box
            component="img"
            src={data.image_url}
            alt="Reporte"
            sx={{
              width: "100%",
              height: 150,
              borderRadius: 2,
              objectFit: "cover",
              mb: 2,
            }}
          />
        ) : (
          <Alert severity="info">No hay imagen</Alert>
        )}

        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Título"
              value={info.title}
              onChange={(e) => setInfo({ ...info, title: e.target.value })}
              sx={{ mb: 2 }}
              inputProps={{ maxLength: 50 }}
            />
            <Select
              fullWidth
              value={info.category}
              onChange={(e) =>
                setInfo((prev) => ({ ...prev, category: e.target.value }))
              }
              sx={{ mb: 2 }}
            >
              <MenuItem value="seleccione_una_opcion">
                Seleccione una opción
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>

            <Box
              sx={{
                height: 5,
                borderRadius: 1,
                mb: 2,
                backgroundColor: categoryTypeColor[info.category] || "#E0E0E0",
              }}
            />
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={5}
              value={info.content}
              onChange={(e) =>
                setInfo((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {info.title || "Reporte"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {data ? categoryTypeText[data.category] : ""}
            </Typography>
            <Box
              sx={{
                height: 5,
                borderRadius: 1,
                mb: 2,
                backgroundColor: data
                  ? categoryTypeColor[data.category] || "#E0E0E0"
                  : "#E0E0E0",
              }}
            />
            <Typography variant="body1" paragraph>
              {info.content || "Sin descripción"}
            </Typography>
            <Typography variant="caption" display="block" textAlign="right">
              {data.city}, {data.state}
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", alignItems: "stretch" }}>
        {editMode ? (
          <Button fullWidth variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        ) : isOwner ? (
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setEditMode(true)}
            >
              Editar
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </Box>
        ) : null}
        <Button fullWidth variant="outlined" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalInfoComponent;
