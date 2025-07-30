// components/ProtectedRoute.tsx
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    console.log("user protected", user);
    if (!user.uid) {
      console.log("entra");
      router.push("/views/login");
    }
  }, [user, router]);

  if (!user.uid) return null; // O spinner

  return <>{children}</>;
}
