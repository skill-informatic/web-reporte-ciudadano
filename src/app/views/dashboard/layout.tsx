import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { primary_title, secundary_title } = {
    primary_title: "Reporte CiudadanoMX",
    secundary_title: "Panel de Contenido",
  };
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <p className="brand">{primary_title}</p>
        <p className="sidebar-label">{secundary_title}</p>
        <nav className="menu">
          <ul>
            <li className="active">
              {/* /views/dashboard/reports_main */}
              <span className="icon">📷</span> Reportes
            </li>
            <li>
              <span className="icon">📰</span> Noticias
            </li>
            <li>
              <span className="icon">📍</span> Sitios de Interés
            </li>
            <li>
              <span className="icon">🗺️</span> Mapa
            </li>
            <li>
              <span className="icon">👥</span> Cuentas
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="main-panel">
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
      </main>
    </div>
  );
};

export default layout;
