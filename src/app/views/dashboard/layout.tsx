"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const { primary_title, secundary_title } = {
    primary_title: "Reporte CiudadanoMX",
    secundary_title: "Panel de Contenido",
  };

  // Lista de rutas del menú
  const menuItems = [
    { href: "/views/dashboard/reports_main", icon: "📷", label: "Reportes" },
    { href: "/views/dashboard/news", icon: "📰", label: "Noticias" },
    { href: "/views/dashboard/places", icon: "📍", label: "Sitios de Interés" },
    { href: "/views/dashboard/map", icon: "🗺️", label: "Mapa" },
    { href: "/views/dashboard/account", icon: "👥", label: "Cuentas" },
  ];

  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link className="brand" href={"/views/dashboard/reports_main"}>
            {primary_title}
          </Link>

          <p className="sidebar-label">{secundary_title}</p>
          <nav className="menu">
            <ul className="list_ul">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`list_li ${
                      pathname.startsWith(item.href) ? "active" : ""
                    }`}
                  >
                    <span className="icon">{item.icon}</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main */}
        <div className="main-panel">
          <header className="topbar">
            <div className="topbar-left">
              <p>Mi Centro de Trabajo</p>
            </div>
            <div className="topbar-center">
              <h1>Acapulco De Juarez Guerrero</h1>
            </div>
            <div className="topbar-right">
              <span className="profile-icon">👤</span>
            </div>
          </header>

          <div className="main-content">{children}</div>

          <footer className="footer-warning">
            <p>Create By Mario Cortez</p>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
