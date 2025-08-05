"use client";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/views/dashboard/reports_main");
}
