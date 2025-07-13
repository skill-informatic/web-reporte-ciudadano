// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // o "dark"
    primary: {
      main: "#1976d2", // Azul MUI por defecto
    },
    secondary: {
      main: "#dc004e", // Rosa fuerte
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: `"Geist", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: "2.5rem",
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
