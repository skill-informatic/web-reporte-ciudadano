"use client";
import { redirect } from "next/navigation";
// import { useAuthListener } from "./hooks/useAuthListener";
// import { useAuthListener } from "./hooks/useAuthListener";

export default function NotFound() {
  //Verificar que no aya usuario en el storage

  // useAuthListener();

  redirect("/views/dashboard/reports_main");
}
