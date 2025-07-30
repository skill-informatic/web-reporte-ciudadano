// components/ProtectedRoute.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user.uid) return null; // O spinner

  return <>{children}</>;
}
