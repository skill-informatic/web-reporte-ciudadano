"use client";
import React from "react";
import { useAuthListener } from "../hooks/useAuthListener";
import LoadingComponent from "../components/LoadingComponent";

const layout = ({ children }: { children: React.ReactNode }) => {
  //agregar aqui las alertar y ver el redux
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading } = useAuthListener();

  if (loading) {
    return <LoadingComponent text="Create By Mario Cortez" />;
  }
  return <>{children}</>;
};

export default layout;
