import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface props {
  open: boolean;
  on_close: () => void;
  type: "success" | "error" | "info" | "warning";
  text: string;
}

export default function SnackbarComponent(props: props) {
  return (
    <Snackbar
      onClose={props.on_close}
      open={props.open}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      autoHideDuration={4000}
    >
      <Alert
        variant="filled"
        severity={props.type}
        sx={{ backgroundColor: "", color: "white", fontWeight: 900 }}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
}
