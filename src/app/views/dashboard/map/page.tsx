// src/app/views/dashboard/map/page.tsx
"use client";

import dynamic from "next/dynamic";

// Import dinámico del componente de mapa (que ya es cliente)
const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function Page() {
  return <MapView />;
}
