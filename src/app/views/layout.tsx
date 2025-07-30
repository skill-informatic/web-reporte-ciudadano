"use client";
import React from "react";
import { useAuthListener } from "../hooks/useAuthListener";

const layout = ({ children }: { children: React.ReactNode }) => {
  //agregar aqui las alertar y ver el redux
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAuthListener();
  return <>{children};</>;
};

export default layout;
