"use client";

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface PropsLoadingComponent {
  text: string;
}

const LoadingComponent: React.FC<PropsLoadingComponent> = ({ text }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: "#8B5CF6",
        }}
      />
      <Typography variant="body1" mt={2}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
