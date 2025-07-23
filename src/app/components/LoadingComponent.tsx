import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface PropsLoadingComponent {
  text: string;
}

const LoadingComponent = ({ text }: PropsLoadingComponent) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
      <Typography>{text}</Typography>
    </Box>
  );
};

export default LoadingComponent;
